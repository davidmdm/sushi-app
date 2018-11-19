package datastore

import (
	"fmt"
	"sync"
)

type item struct {
	Id          string  `json:"id"`
	Price       float32 `json:"price"`
	Description string  `json:"description"`
}

type Order struct {
	Name     string `json:"name"`
	Purchase string `json:"purchase"`
}

type Orders struct {
	List []Order
	sync.Mutex
}

func (orders *Orders) Add(item Order) error {
	orders.Lock()
	defer orders.Unlock()

	for idx := range orders.List {
		if orders.List[idx].Name == item.Name {
			return fmt.Errorf("duplicate name: %s", item.Name)
		}
	}

	orders.List = append(orders.List, item)
	return nil
}

func (orders *Orders) Remove(name string) {
	orders.Lock()
	defer orders.Unlock()

	var i = -1
	for idx := range orders.List {
		if orders.List[idx].Name == name {
			i = idx
			break
		}
	}

	if i > -1 {
		orders.List = append(orders.List[:i], orders.List[i+1:]...)
	}
}

var Menu = map[string][]item{
	"Midi Express": []item{
		{Id: "A", Price: 5.95, Description: "Combo A: 11 mcx / 5 Futomakis - 6 Hosomakis"},
		{Id: "B", Price: 7.95, Description: "Combo B: 12 mcx / 6 Futomakis - 6 Hosomakis"},
		{Id: "C", Price: 9.95, Description: "Combo C: 14 mcx / 6 Futomakis - 2 Nigiris - 6 Hosomakis"},
		{Id: "D", Price: 9.95, Description: "Combo D: 16 mcx / 8 Makis - 2 Nigiris - 6 Hosomakis"},
		{Id: "E", Price: 14.75, Description: "Combo E: 20 mcx / 10 Futomakis - 4 Nigiris - 6 Hosomakis"},
	},
	"Assiettes Assorties": []item{
		{Id: "87", Price: 8.95, Description: "12 mcx: / 6 Futomakis - 6 Hosomakis"},
		{Id: "88", Price: 11.45, Description: "14 mcx / 6 Futomakis - 2 Nigiris - 6 Hosomakis"},
		{Id: "89", Price: 11.45, Description: "16 mcx / 8 Makis - 2 Nigiris - 6 Hosomakis"},
		{Id: "90", Price: 16.45, Description: "20 mcx / 10 Futomakis - 4 Nigiris - 6 Hosomakis"},
	},
	"Nigiris / Sashimis": []item{
		{Id: "1", Price: 2.5, Description: "Kunsei sake / saumon fume"},
		{Id: "2", Price: 2.25, Description: "Sake / saumon"},
		{Id: "2a", Price: 2.5, Description: "Sake yaki / saumon flambe"},
		{Id: "3", Price: 1.95, Description: "Ebi / crevette"},
		{Id: "4", Price: 1.75, Description: "Goberge"},
		{Id: "5", Price: 1.95, Description: "Tako / pieuvre"},
		{Id: "6", Price: 1.95, Description: "Tama / omelette japonaise"},
		{Id: "6a", Price: 1.75, Description: "Inari / tofu frit marine"},
		{Id: "7", Price: 2.25, Description: "Albacore yaki / thon blanc"},
		{Id: "8", Price: 2.5, Description: "Maguro / thon"},
		{Id: "8a", Price: 2.75, Description: "Maguro / thon flambe"},
		{Id: "9", Price: 1.75, Description: "Tai / tilapia"},
		{Id: "10", Price: 2.5, Description: "Unagi / anguille grillee"},
		{Id: "11", Price: 2.75, Description: "Hotategai / petoncle"},
		{Id: "12", Price: 1.95, Description: "Masago / caviar de caplin"},
		{Id: "13", Price: 2.5, Description: "Tobiko / caviar de poisson volant"},
		{Id: "13a", Price: 2.95, Description: "Ikura / caviar de Saumon"},
		{Id: "14", Price: 2.75, Description: "Sake tempura / saumon epice"},
		{Id: "15", Price: 2.50, Description: "Tako tempura / pieuvre epice"},
		{Id: "16", Price: 2.95, Description: "Maguro tempura / thon epice"},
		{Id: "17", Price: 2.5, Description: "Crabe tempura / crabe epice"},
		{Id: "18", Price: 2.5, Description: "Crevette tempura / crevette epice"},
		{Id: "19", Price: 2.95, Description: "Hotategai tempura / petoncle epice"},
	},
	"Hosomakis - 6mcx": []item{
		{Id: "20", Price: 2.90, Description: "Kappa / concombre"},
		{Id: "21", Price: 3.45, Description: "Avocado / avocat"},
		{Id: "22", Price: 2.95, Description: "Mango / mangue"},
		{Id: "23", Price: 3.25, Description: "Oshinko / radis japonais marine"},
		{Id: "24", Price: 3.45, Description: "Yam / patate sucree tempura"},
		{Id: "25", Price: 2.95, Description: "Tofu / tofu gingembre et arachid, mayonnaise"},
		{Id: "25a", Price: 3.25, Description: "Inari / tofu frit marine"},
		{Id: "26", Price: 3.45, Description: "Tamago / omelette japonaise"},
		{Id: "27", Price: 3.45, Description: "Kani-Kama / goberge japonaise"},
		{Id: "28", Price: 3.95, Description: "Ebi epice / crevette epice"},
		{Id: "29", Price: 4.25, Description: "Kani epice / crabe de neige epice"},
		{Id: "30", Price: 4.25, Description: "Tai epice / tilapia epice"},
		{Id: "31", Price: 4.75, Description: "Sake maki / saumon"},
		{Id: "32", Price: 4.75, Description: "Sake epice / saumon epice"},
		{Id: "33", Price: 5.25, Description: "Tekka / thon"},
		{Id: "34", Price: 5.25, Description: "Tekka epice / thon epice"},
		{Id: "35", Price: 5.45, Description: "hotegai / petoncle"},
		{Id: "36", Price: 5.45, Description: "hotegai epice / petoncle epice"},
	},
}

var Purchases = Orders{
	List: []Order{},
}
