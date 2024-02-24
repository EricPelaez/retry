import express from "express";
import mongoose from "mongoose";

import Game from './models/Game.js'
import Trade from './models/Trade.js'
import User from './models/User.js'


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}))

mongoose.set("strictQuery", false)
mongoose.connect('mongodb+srv://firstuser:password01@cluster0.qhuomr5.mongodb.net/').then(() => {
    console.log('connected to MongoDB')
    app.listen(3000, ()=> {
        console.log(`Node API app is running on port 3000`)
    });
}).catch((error) => {
    console.log(error)
})




// API Routes

// Create a new user
app.post('/users', async (req, res) => {
    try {
    console.log(req.body);
      const user = await User.create(req.body);
      res.status(201).json({
        userId: user._id.toString(),
        username: user.username,
        email: user.email,
        address: user.address
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Update user information
  app.patch('/users/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
      res.status(200).json({ message: 'User information updated' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Get all trades related to a user
  app.get('/users/:userId/trades', async (req, res) => {
    try {
      const { userId } = req.params;
      const trades = await Trade.find({ $or: [{ offerer: userId }, { receiver: userId }] });
      res.status(200).json({ message: 'List of user\'s trades', trades });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Create a new game
  app.post('/games', async (req, res) => {
    try {
      const game = await Game.create(req.body);
      res.status(201).json({
        gameId: game._id.toString(),
        name: game.name,
        publisher: game.publisher,
        year: game.year,
        gamingSystem: game.gamingSystem,
        condition: game.condition,
        owners: game.owners,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Update a game
  app.put('/games/:gameId', async (req, res) => {
    try {
      const { gameId } = req.params;
      const updatedGame = await Game.findByIdAndUpdate(gameId, req.body, { new: true });
      res.status(200).json({ message: 'Game updated' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Delete a game
  app.delete('/games/:gameId', async (req, res) => {
    try {
      const { gameId } = req.params;
      await Game.findByIdAndDelete(gameId);
      res.status(200).json({ message: 'Game deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Search for video games
  app.get('/games/:search', async (req, res) => {
    try {
      const { search } = req.params;
      const results = await Game.find({ $text: { $search: search } });
      res.status(200).json({ message: 'Search results', results });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Create a new trade
  app.post('/trades', async (req, res) => {
    try {
      
      console.log("We at Trade endpoitn");

    //   await controllers.sendMessageToKafkaEricV();

      const trade = await Trade.create(req.body);
      
      res.status(200).json({
        tradeId: trade._id.toString(),
        offerer: trade.offerer,
        receiver: trade.receiver,
        gamesOffered: trade.gamesOffered,
        gamesRequested: trade.gamesRequested,
        status: trade.status,
        createdAt: trade.createdAt,
      });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Get details of a specific trade
  app.get('/trades/:tradeId', async (req, res) => {
    try {
      const { tradeId } = req.params;
      const trade = await Trade.findById(tradeId);
      res.status(200).json({ message: 'Trade details', trade });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Update the status of a trade
  app.patch('/trades/:tradeId', async (req, res) => {
    try {
      const { tradeId } = req.params;
      const updatedTrade = await Trade.findByIdAndUpdate(tradeId, { status: req.body.status }, { new: true });
      res.status(200).json({ message: 'Trade status updated' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });