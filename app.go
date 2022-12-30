package main

import (
	"changeme/Images"
	"context"
	"encoding/json"
	"fmt"
	"github.com/labstack/gommon/log"
	"io"
	"net/http"
	"sort"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) GetRandomImageUrl() string {
	response, err := http.Get("https://dog.ceo/api/breeds/image/random")
	if err != nil {
		log.Fatal(err)
	}

	responseData, err := io.ReadAll(response.Body)
	if err != nil {
		log.Fatal(err)
	}

	var data Images.RandomImage
	err = json.Unmarshal(responseData, &data)
	if err != nil {
		log.Fatal(err)
	}

	return data.Message
}

func (a *App) GetBreedList() []string {
	var breeds []string

	response, err := http.Get("https://dog.ceo/api/breeds/list/all")
	if err != nil {
		log.Fatal(err)
	}

	responseData, err := io.ReadAll(response.Body)
	if err != nil {
		log.Fatal(err)
	}

	var data Images.AllBreads
	err = json.Unmarshal(responseData, &data)
	if err != nil {
		log.Fatal(err)
	}

	for b := range data.Message {
		breeds = append(breeds, b)
	}

	sort.Strings(breeds)

	return breeds
}

func (a *App) GetImageUrlsByBreed(breed string) []string {
	url := fmt.Sprintf("%s%s%s%s", "https://dog.ceo/api/", "breed/", breed, "/images")
	response, err := http.Get(url)
	if err != nil {
		log.Fatal(err)
	}

	responseData, err := io.ReadAll(response.Body)
	if err != nil {
		log.Fatal(err)
	}

	var data Images.ImagesByBreed
	err = json.Unmarshal(responseData, &data)

	return data.Message
}