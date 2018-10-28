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

var Catalogue = []item{
	{Id: "1", Price: 16.99, Description: "20 pieces"},
	{Id: "2", Price: 13.99, Description: "16 pieces"},
	{Id: "3", Price: 9.99, Description: "12 pieces"},
}

var Purchases = Orders{
	List: []Order{},
}
