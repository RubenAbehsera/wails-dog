package Images

type RandomImage struct {
	Message string
	Status  string
}

type AllBreads struct {
	Message map[string][]string
	Status  string
}

type ImagesByBreed struct {
	Message []string
	Status  string
}
