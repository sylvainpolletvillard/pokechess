// find objects in a Tiled layer that containt a property called "type" equal to a certain value
export function findObjectsByType(type: string, map: any) {
    return map.objects[0].objects.filter((element: any) => {
        if (element.type === type) {
            //Phaser uses top left, Tiled bottom left so we have to adjust the y position
            //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
            //so they might not be placed in the exact pixel position as in Tiled
            //console.log("Found " + element.type);
            //element.y -= map.tileHeight
            if(!element.tiledY){
                element.tiledY = element.y
            }

            element.y = element.tiledY - element.height;
            element.properties = element.properties || {};
            Object.values(element.properties).forEach((prop: any) => {
                if (prop && prop.name) element.properties[prop.name] = prop.value
            })
            return element
        }
    })
}

export function findObjectByName(name: string, type: string, map: any) {
    return findObjectsByType(type, map).find((el: any) => el.name === name)
}

export interface MapObject {
    name: string;
    type: string;
    properties: { [key: string]: any };
    x: number;
    y: number;
    width: number;
    height: number;
}