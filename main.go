package main

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/davidmdm/sushi-app/datastore"
)

func main() {

	http.HandleFunc("/", serveApp)
	http.HandleFunc("/orders", orderHandler)
	http.HandleFunc("/catalogue", serveCatalgue)

	log.Fatal(http.ListenAndServe(":8000", nil))
}

func serveFile(w http.ResponseWriter, filename string) {
	f, err := os.Open("./app/dist/" + filename)
	if err != nil {
		http.Error(w, "something went wrong", http.StatusInternalServerError)
		return
	}
	defer f.Close()
	io.Copy(w, f)
}

func serveApp(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		serveFile(w, r.URL.Path[1:])
		return
	}
	serveFile(w, "index.html")
}

func serveCatalgue(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		http.Error(w, http.StatusText(http.StatusMethodNotAllowed), http.StatusMethodNotAllowed)
		return
	}
	json.NewEncoder(w).Encode(datastore.Catalogue)
}

func orderHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		viewOrders(w, r)
		return
	case "POST":
		createOrder(w, r)
		return
	case "DELETE":
		removeOrder(w, r)
		return
	}
	http.Error(w, http.StatusText(http.StatusMethodNotAllowed), http.StatusMethodNotAllowed)
}

func viewOrders(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(datastore.Purchases.List)
}

func removeOrder(w http.ResponseWriter, r *http.Request) {

	var order datastore.Order

	if err := json.NewDecoder(r.Body).Decode(&order); err != nil {
		http.Error(w, err.Error(), 400)
		return
	}

	if order.Name == "" {
		http.Error(w, "name is required", http.StatusBadRequest)
		return
	}

	datastore.Purchases.Remove(order.Name)

	w.WriteHeader(200)
}

func createOrder(w http.ResponseWriter, r *http.Request) {

	var order datastore.Order

	d := json.NewDecoder(r.Body)

	if err := d.Decode(&order); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if order.Name == "" {
		http.Error(w, "name is required", http.StatusBadRequest)
		return
	}
	if order.Purchase == "" {
		http.Error(w, "purchase is required", http.StatusBadRequest)
		return
	}

	err := datastore.Purchases.Add(order)
	if err != nil {
		http.Error(w, err.Error(), http.StatusConflict)
		return
	}

	w.WriteHeader(200)
}
