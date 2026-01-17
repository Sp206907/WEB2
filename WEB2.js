require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./Blog'); 
mongoose.connect('mongodb://localhost:27017/')
const app = express();
const PORT = 3001;

app.use(express.static('public'));
app.use(express.json());

app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});
app.post('/blogs', async (req, res) => {
  const newBlog = new Blog(req.body);
  await newBlog.save();
  res.status(201).json(newBlog);
});
app.get('/blogs', async (req, res) => {
  const blogs = await Blog.find()
  res.json(blogs);
});
app.get('/blogs/:id', async (req, res) => {
  try{
    const blog = await Blog.findById(req.params.id);
    if(!blog){
      return res.status(404).json({message: 'Blog not found'});
    }
    res.json(blog);
  } catch (error){
    res.status(400).json({message: 'Invalid blog ID'});
  }
});
app.put('/blogs/:id', async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if(!updatedBlog){
    return res.status(404).json({message: 'Blog not found'});
  } 
  res.json(updatedBlog);
}); 
app.delete('/blogs/:id', async (req, res) => {
  const deletedBlog = await Blog.findByIdAndDelete(req.params.id);    
  if(!deletedBlog){
    return res.status(404).json({message: 'Blog not found'});
  } 
  res.json({message: 'Blog deleted successfully'}); 
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});