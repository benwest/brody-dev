var m = require('mithril');

var Background = require('./Background');
var Module = require('./Module');

var group = modules => modules.reduce( ( backgrounds, module ) => {
    
    if ( module.type === 'background' ) {
        
        backgrounds.push( { modules: [], attrs: module.attrs } );
        
        return backgrounds;
        
    } else if ( backgrounds.length === 0 ) {
        
        backgrounds.push( { modules: [], color: '#000' } );
        
    }
    
    backgrounds[ backgrounds.length - 1 ].modules.push( module );
    
    return backgrounds;
    
}, [] );

module.exports = {
    
    // oninit: ({ attrs: { modules, meta }, state }) => {
        
    //     state.backgrounds = group( modules );
        
    //     state.style = {
    //         color: meta.textColor
    //     };
        
    // },
    
    view: ({ attrs: { modules, meta } }) => {
        
        var backgrounds = group( modules ).map( ( background, i ) => {
            
            var modules = background.modules.map( ( module, i ) => {
                
                return <Module { ...module }/>;
                
            })
            
            return (
                <Background { ...background.attrs }>
                    { modules }
                </Background>
            )
            
        });
        
        var style = {
            color: meta.textColor
        };
        
        return <div style={ style }>{ backgrounds }</div>;
        
    }
    
}