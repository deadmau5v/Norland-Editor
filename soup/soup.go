package soup

import (
	_ "embed"
)

type Soup struct {
}

func New() *Soup {
	return &Soup{}
}
