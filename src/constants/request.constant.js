module.exports = {
    BODY: {
        "type": "message",
        "attachments": [
            {
                "contentType": "application/vnd.microsoft.teams.card.list",
                "content": {
                    "title": "Pull Requests abiertos más de 1 día:",
                    "items": [
                    ]
                }
            }
        ]
    },
    ITEM: {
        "type": "resultItem",
        "icon": "https://cdn-icons-png.flaticon.com/512/25/25231.png",
        "title": "", // Test
        "subtitle": "", // 1 día(s)
        "tap": {
            "type": "openUrl",
            "value": "" // https://github.com/j1myx/githubactiontest/pull/1
        }
    }
}