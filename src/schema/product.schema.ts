import { object,number, string,TypeOf} from "zod"

const payload={
body:object({
    title:string({
        required_error:'title is required'
    }),
   
    description:string({
        required_error:'description is required'
    }).min(60,"description should be at least 60 characters long"),
    price:number({
        required_error:'price is required',
    
    }),
    image:string({
        required_error:'image is required'
    })

})
}

const params={
    params:object({
        productId:string({
            required_error:'productId is required'
        })
    })
}

export const createProuctSchema=object({
    ...payload,
    ...params
})
export const updateProuctSchema=object({
    ...payload,
    ...params
})
export const deleteProuctSchema=object({
    ...payload,
    ...params
})

export const getProuctSchema=object({
    ...payload,
    ...params
})

export type createProductInput=TypeOf<typeof createProuctSchema>
export type updateProductInput=TypeOf<typeof updateProuctSchema>
export type ReadeProductInput=TypeOf<typeof getProuctSchema>
export type DeleteeProductInput=TypeOf<typeof deleteProuctSchema>