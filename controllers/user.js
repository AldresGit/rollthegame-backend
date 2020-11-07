'use strict'

var User = require('../models/user');

var controller = {

	home: function(req, res){
		return res.status(200).send({
			message: 'Soy la home'
		});
	},

	test: function(req, res){
		return res.status(200).send({
			message: 'Soy el metodo test del controlador de usuarios'
		});
	},

	register: function(req, res){
		var user = new User();

		var params = req.body;
		user.nickname = params.nickname;
		user.password = params.password;

		var newGames = [
		      {name: "Crash Trilogy", platforms: "PS4", genres: "Platforms, Arcade", date: 2018},
		      {name: "Zelda BOTW", platforms: "SWITCH", genres: "Adventure, Open World", date: 2017},
		      {name: "God of War", platforms: "PS4", genres: "Action, Narrative", date: 2018},
		      {name: "Pokemon Perla", platforms: "NDS", genres: "Adventure, RPG", date: 2017},
		      {name: "Darksiders Genesis", platforms: "PS4, XBOX ONE, SWITCH", genres: "Platforms, Arcade, Co-op", date: 2018},
		      {name: "Minecraft", platforms: "PC, PS4, SWITCH, XBOX ONE", genres: "Adventure, Open World", date: 2017}
		];

		//var a = JSON.stringify(newGames);
		//console.log('Coordinates string: ', a);

		//var parsed = JSON.parse(a);
		//console.log('Parsed Coordinates: ', parsed);

		user.games = newGames;


		user.save((err, userStored) => {
			if(err) return res.status(500).send({message: 'Error al guardar el documento'});

			if(!userStored) return res.status(404).send({message: 'No se ha podido guardar el usuario'});

			return res.status(200).send({user: userStored});
		});

	},

	getUser: function(req, res){
		var userId = req.params.id;

		if(userId == null) return res.status(404).send({message: 'El Usuario no existe.'});

		User.findById(userId, (err, user) => {
			if(err) return res.status(500).send({message: 'Error al devolver los datos de usuario.'});

			if(!user) return res.status(404).send({message: 'El Usuario no existe.'});

			return res.status(200).send({
				user
			});
		});
	},

	getUsers: function(req, res){
		User.find({}).exec((err, users) => {

			if(err) return res.status(500).send({message: 'Error al devolver todos los usuarios.'});

			if(!users) return res.status(404).send({message: 'No hay usuarios que mostrar.'});

			return res.status(200).send({users});
		});
	},

	updateUser: function(req, res){
		var userId = req.params.id;
		var update = req.body;

		User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
			if(err) return res.status(500).send({message: 'Error al actualizar.'});

			if(!userUpdated) return res.status(404).send({message: 'No existe el usuario a actualizar.'});

			return res.status(200).send({user: userUpdated});
		});
	},

	deleteUser: function(req, res){
		var userId = req.params.id;

		User.findByIdAndRemove(userId, (err, userRemoved) => {
			if(err) return res.status(500).send({message: 'Error al borrar el usuario.'});

			if(!userRemoved) return res.status(404).send({message: 'No existe el usuario a eliminar.'});

			return res.status(200).send({user: userRemoved});
		});
	}

};

module.exports = controller;