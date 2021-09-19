class Car{
    constructor(colr) {
        this.color = colr;
    }
    static colorChanger(){
        Car.check();
    }
    static check(){
        // Car.colorChanger();
        console.log("color changed : "+this.color);
    }
}

Car.colorChanger()
