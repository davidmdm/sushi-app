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

var Catalog = []item{
	{Id: "A", Price: 5.95, Description: "11 mcx / 5 Futomakis - 6 Hosomakis"},
	{Id: "B", Price: 7.95, Description: "12 mcx / 6 Futomakis - 6 Hosomakis"},
	{Id: "C", Price: 9.95, Description: "14 mcx / 6 Futomakis - 2 Nigiris - 6 Hosomakis"},
	{Id: "D", Price: 9.95, Description: "16 mcx / 8 Makis - 2 Nigiris - 6 Hosomakis"},
	{Id: "E", Price: 14.75, Description: "20 mcx / 10 Futomakis - 4 Nigiris - 6 Hosomakis"},
}

var Purchases = Orders{
	List: []Order{},
}
