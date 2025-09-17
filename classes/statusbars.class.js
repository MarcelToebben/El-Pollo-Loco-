class StatusBars {
    constructor(world) {
        this.world = world;
        this.ctx = world.ctx;

        this.loadImages();
    }

    loadImages() {
        this.coinBarImgs = [
            'img/statusbars/statusbars_statusbar/statusbar_coin/statusbar_coin_green/statusbar_coin_green_0.png',
            'img/statusbars/statusbars_statusbar/statusbar_coin/statusbar_coin_green/statusbar_coin_green_20.png',
            'img/statusbars/statusbars_statusbar/statusbar_coin/statusbar_coin_green/statusbar_coin_green_40.png',
            'img/statusbars/statusbars_statusbar/statusbar_coin/statusbar_coin_green/statusbar_coin_green_60.png',
            'img/statusbars/statusbars_statusbar/statusbar_coin/statusbar_coin_green/statusbar_coin_green_80.png',
            'img/statusbars/statusbars_statusbar/statusbar_coin/statusbar_coin_green/statusbar_coin_green_100.png'
        ].map(src => this.loadImage(src));

        this.bottleBarImgs = [
            'img/statusbars/statusbars_statusbar/statusbar_bottle/statusbar_bottle_green/statusbar_bottle_green_0.png',
            'img/statusbars/statusbars_statusbar/statusbar_bottle/statusbar_bottle_green/statusbar_bottle_green_20.png',
            'img/statusbars/statusbars_statusbar/statusbar_bottle/statusbar_bottle_green/statusbar_bottle_green_40.png',
            'img/statusbars/statusbars_statusbar/statusbar_bottle/statusbar_bottle_green/statusbar_bottle_green_60.png',
            'img/statusbars/statusbars_statusbar/statusbar_bottle/statusbar_bottle_green/statusbar_bottle_green_80.png',
            'img/statusbars/statusbars_statusbar/statusbar_bottle/statusbar_bottle_green/statusbar_bottle_green_100.png'
        ].map(src => this.loadImage(src));

        this.lifeBarImgs = [
            'img/statusbars/statusbars_statusbar/statusbar_health/statusbar_health_green/statusbar_health_green_0.png',
            'img/statusbars/statusbars_statusbar/statusbar_health/statusbar_health_green/statusbar_health_green_20.png',
            'img/statusbars/statusbars_statusbar/statusbar_health/statusbar_health_green/statusbar_health_green_40.png',
            'img/statusbars/statusbars_statusbar/statusbar_health/statusbar_health_green/statusbar_health_green_60.png',
            'img/statusbars/statusbars_statusbar/statusbar_health/statusbar_health_green/statusbar_health_green_80.png',
            'img/statusbars/statusbars_statusbar/statusbar_health/statusbar_health_green/statusbar_health_green_100.png'
        ].map(src => this.loadImage(src));
    }

    loadImage(src) {
        const img = new Image();
        img.src = src;
        return img;
    }

 draw() {
    const ctx = this.ctx;
    const padding = 10;
    const barWidth = 200;
    const barHeight = 30;
    const spacing = 10;

    const char = this.world.character;

    const coinIndex = Math.min(this.coinBarImgs.length - 1, Math.floor(char.coins / char.maxCoins * (this.coinBarImgs.length - 1)));
    const bottleIndex = Math.min(this.bottleBarImgs.length - 1, Math.floor(char.bottles / char.maxBottles * (this.bottleBarImgs.length - 1)));
    const lifeIndex = Math.min(this.lifeBarImgs.length - 1, Math.floor(char.energy / char.maxLife * (this.lifeBarImgs.length - 1)));

    ctx.drawImage(this.coinBarImgs[coinIndex], padding, padding, barWidth, barHeight);
    ctx.drawImage(this.bottleBarImgs[bottleIndex], padding, padding + barHeight + spacing, barWidth, barHeight);
    ctx.drawImage(this.lifeBarImgs[lifeIndex], padding, padding + (barHeight + spacing) * 2, barWidth, barHeight);
}

}