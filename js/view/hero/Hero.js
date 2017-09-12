var m = require('mithril');
var j2c = require('mithril-j2c');
var Container = require('./Container');
var GL_SUPPORTED = require('./isGLSupported');
var regl = require('regl');
var lazyRect = require('../utils/lazyRect');
var visible = require('../utils/visible');
var lazyMouse = require('./lazyMouse');
var createTools = require('./tools');
var textureSource = require('./utils/textureSource');
var viewport = require('../utils/viewport')

var styles = j2c.attach({
    '.canvas': {
        width: '100%',
        height: '100%',
        background: 'black',
        '@keyframes fade-in': {
            ' from': { opacity: 0 },
            ' to': { opacity: 1 }
        },
        // animation: 'fade-in 1s'
    }
})

var Shader = {
    
    initialized: false,
    
    context: null,
    
    mouse: [ 0, 0 ],
    
    oninit: ({ state }) => {
        
        state.onmousemove = state.onmousemove( state );
        
    },
    
    onmousemove: state => e => {
        
        state.mouse = [ e.clientX, e.clientY ];
        
    },
    
    oncreate: ({ attrs, state, dom }) => {
        
        if ( !GL_SUPPORTED ) return;
        
        state.context = regl({ canvas: dom, pixelRatio: 1 });
            
        state.rect = lazyRect.subscribe( dom );
        
        state.lazyMouse = lazyMouse();
        
        var textures = textureSource( state.context );
        var tools = createTools( state.context );
        
        state.frame = state.context.frame( ctx => {
            
            var rect = lazyRect.get( state.rect );
            
            if ( visible( rect ) ) {
                
                state.lazyMouse.push( [ state.mouse[ 0 ] - rect.left, state.mouse[ 1 ] - rect.top ] );
                
                if ( rect.width !== dom.width || rect.height !== dom.height ) {
                    dom.width = rect.width;
                    dom.height = rect.height;
                }
                
                tools.scene({
                    viewport: [ rect.width, rect.height ],
                    clipSize: [ rect.width, rect.height ],
                    clipOffset: [ 0, 0 ],
                    mouse: state.mouse,
                    lazyMouse: state.lazyMouse.sample,
                    textures,
                    tools
                }, state => {
                    
                    attrs.draw({ state, attrs });
                    
                });
            
            }
            
        });
        
        state.initialized = true;
        
    },
    
    onremove: ({ state }) => {
        
        state.frame.cancel();
        state.context.destroy();
        lazyRect.unsubscribe( state.rect );
        
    },
    
    view: ({ state: { onmousemove } }) => {
        
        return <canvas class={ styles.canvas } onmousemove={ onmousemove }/>
        
    }
    
}

module.exports = draw => {
    
    return {
        
        view: ({ attrs }) => {
            
            var inner = <Shader draw={ draw } { ...attrs }/>;
            
            if ( attrs.url ) {
                
                inner = <a href={ attrs.url } oncreate={ m.route.link }>{ inner }</a>;
                
            }
            
            return (
                <Container masthead={ attrs.masthead }>
                    { inner }
                </Container>
            )
            
        }
        
    }
    
}