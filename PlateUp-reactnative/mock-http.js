import { createServer } from "miragejs"
import env from "./env"
import { Image } from "react-native"
import recipe1Img from "./assets/imgs/mock-recipe-1.png"
import recipe2Img from "./assets/imgs/mock-recipe-2.png"
import recipe3Img from "./assets/imgs/mock-recipe-3.png"
import recipe4Img from "./assets/imgs/mock-recipe-4.png"


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

            this.get("/recipe", () => {
                return {
                    recipes: [
                        { 
                            ingredients: {},
                            name: "Taro Ice Cream",
                            preview_media_url: Image.resolveAssetSource(recipe1Img).uri,
                            preview_text: "Make taro flavoured ice-cream at home!",
                            recipe_id: "1",
                            time_h: 5, 
                            time_min: 50 
                        },
                        { 
                            ingredients: {},
                            name: "Expresso",
                            preview_media_url: Image.resolveAssetSource(recipe2Img).uri,
                            preview_text: "Pulling the best shot of expresso...",
                            recipe_id: "2",
                            time_h: 1, 
                            time_min: 30 
                        },
                        { 
                            ingredients: {},
                            name: "Over-roast Prime",
                            preview_media_url: Image.resolveAssetSource(recipe3Img).uri,
                            preview_text: "Easy to make oven-roast prime...",
                            recipe_id: "3",
                            time_h: 3, 
                            time_min: 0 
                        },
                        { 
                            ingredients: {},
                            name: "Thanksgiving Turkey",
                            preview_media_url: Image.resolveAssetSource(recipe4Img).uri,
                            preview_text: "Thankgiving turkey, a healthy alternative for protein.",
                            recipe_id: "4",
                            time_h: 2, 
                            time_min: 50 
                        }
                    ],
                    is_random: false
                }
            })
        }
    })   
}