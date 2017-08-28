var blocks = [{

    "type": "background",
    
    "attrs": {
        
        "color": "#ddd"
        
    }
    
},{
    
    "type": "hero",
            
    "attrs": {}
    
},{
    
    "type": "introduction",
    
    "attrs": {
        
        "text": "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>",
        
        "client": "Channel 4",
        
        "discipline": "Identity",
        
        "year": "2017"
        
    }
    
}]
.concat( require('./text') )
.concat( require('./visuals') )
.concat( require('./background') )

module.exports = {
    
    meta: {
        
        title: "Channel 4",
        
        font: "inherit",
        
        color: "#000"
        
    },
    
    blocks
    
}