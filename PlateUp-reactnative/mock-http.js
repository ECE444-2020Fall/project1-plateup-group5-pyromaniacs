import { createServer } from "miragejs"
import env from "./env"

export default mockHTTP = () => {
    if (window.server) {
        server.shutdown()
      }
      
    window.server = createServer({
        routes() {

            this.urlPrefix = env.SERVER_URL
            
            this.post("/login", () => {
                return {
                    email: "test28",
                    id: "18606548-10c8-11eb-8a7f-0242ac110002",
                    inventory_id: "18606b6a-10c8-11eb-8a7f-0242ac110002",
                    name: "test28",
                    password: "pbkdf2:sha256:150000$tuG3cesQ$f8ec98a66e6d6bf4910de9f5ba2482facd0ae6debf4d4f3e4e09fc09a42dfcc7",
                    settings_id: "18606962-10c8-11eb-8a7f-0242ac110002",
                    shopping_id: "18606ab6-10c8-11eb-8a7f-0242ac110002"
                }
            })

            this.get("/recipes", () => {
                return {
                    recipes: [
                        { id: 1, name: "Inception", year: 2010 },
                        { id: 2, name: "Interstellar", year: 2014 },
                        { id: 3, name: "Dunkirk", year: 2017 },
                    ],
                    is_random: false
                }
            })
        }
    })   
}