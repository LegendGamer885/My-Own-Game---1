class backgroundClass {
    constructor(x,y,w,h,img){
        var options = {
        isStatic: true
        };

        this.animation = spaceAnimation;
        this.speed = 0.05;

        this.w = w;
        this.h = h;

        this.body = Bodies.rectange(x,y,w,h,options);

        this.image = loadImage("./assets/Space/Space.png");
        World.add(world,this.body);
    }

    display(){
        var angle = this.body.angle;
        var pos = this.body.position;
        var index = floor(this.speed % this.animation.length);
        push();
        translate(pos.x,pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.animation[index],0,this.spacePosition,this.w,this.h);
        pop();
    }

    animate(){
        this.speed += 0.05 % 1.1;
    }
}