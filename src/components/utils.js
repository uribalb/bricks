import { current_component } from 'svelte/internal';


export function unusedProps(props, ignores = []) {
    const unusedProps = {}
    Object.entries(props).forEach(([prop, value]) => {
        if (!current_component.$$.props[prop]
        && !ignores.includes(prop)
        && !prop.match(/^\$/))
            unusedProps[prop] = value
    })
    return unusedProps
}

export function objectToElementParam (obj){
    let str = ''
    Object.entries(obj).forEach(([key, value])=>{
        str += `${key}="${value}" `
    })
    return str
}