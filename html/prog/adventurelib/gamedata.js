game.addItem("pizza","Pizza","It's yummy");
game.add("start","Welcome!\n>[\"Next\"](next)<");
game.add("next","Booyah!");
game.addCode("next",function(input)
{
	alert("WOO!");
	this.give("Item");
	this.give("Item");
	alert(this.take("Item"));
	return input.replace(/B/g,"W");
});