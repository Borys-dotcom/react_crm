const config = {
    db: {
        url: "localhost",
        port: "3005",
        collection: {
            customer: "customer",
            action: "action"
        }
    },

    action: {
        selectOptions: [
            {key: "", value: "---"},
            {key: "meeting", value: "Spotkanie"},
            {key: "phoneCall", value: "Rozmowa telefoniczna"},
            {key: "email", value: "Wiadomość email"}
        ]
    }
}

export default config