package main

import (
	"log"
	"os"
	"time"

	"github.com/golang-jwt/jwt"
)

func main() {
	os.Getenv("SECRET_KEY")

	// Do something with the secret key
	secretKey := os.Getenv("SECRET_KEY")

	token := jwt.New(jwt.SigningMethodHS512)
	claims := token.Claims.(jwt.MapClaims)
	claims["authorized"] = true
	claims["user"] = "username"
	claims["exp"] = time.Now().Add(time.Hour * 24).Unix()

	tokenString, err := token.SignedString([]byte(secretKey))
	if err != nil {
		log.Fatal(err)
	}

	log.Println(tokenString)
}
