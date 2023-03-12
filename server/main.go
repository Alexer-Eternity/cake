package main

import (
	"net/http"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func main() {
	// Set the router as the default one shipped with Gin
	r := gin.Default()

	// Serve frontend static files
	r.Use(static.Serve("/", static.LocalFile("../Index/build", true)))
	r.Use(static.Serve("/payment", static.LocalFile("../Payment/build", true)))

	// Setup route group for the API
	api := r.Group("/api")
	{
		api.GET("/", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"message": "pong",
			})
		})
		api.GET("/payment", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"message": "pong",
			})
		})
	}

	// Start and run the server
	r.Run(":4000")
}
