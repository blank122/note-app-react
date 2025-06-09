import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

const NoteDashboard = () => {
  const [notes, setNotes] = useState([
    { id: 1, title: 'Meeting Notes', content: 'Discuss project timeline with team', category: 'work', date: '2023-05-15' },
    { id: 2, title: 'Shopping List', content: 'Milk, eggs, bread, fruits', category: 'personal', date: '2023-05-14' },
    { id: 3, title: 'Ideas', content: 'Start a blog about React development', category: 'ideas', date: '2023-05-10' },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  const categories = ['all', 'work', 'personal', 'ideas'];

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || note.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addNewNote = () => {
    if (newNoteTitle.trim() === '') return;
    
    const newNote = {
      id: notes.length + 1,
      title: newNoteTitle,
      content: newNoteContent,
      category: 'personal',
      date: new Date().toISOString().split('T')[0]
    };
    
    setNotes([newNote, ...notes]);
    setNewNoteTitle('');
    setNewNoteContent('');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Notes Dashboard</h1>
        
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Input 
            placeholder="Search notes..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {selectedCategory === 'all' ? 'All Categories' : selectedCategory}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {categories.map(category => (
                <DropdownMenuItem 
                  key={category} 
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            New Note
          </Button>
        </div>
        
        <Separator className="my-6" />
        
        {/* New Note Form (Collapsible in a real app) */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Create New Note</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input 
                placeholder="Title" 
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
              />
              <Input 
                placeholder="Content" 
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={addNewNote}>Save Note</Button>
          </CardFooter>
        </Card>
        
        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.map(note => (
            <Card key={note.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{note.title}</CardTitle>
                <div className="flex justify-between text-sm text-gray-500">
                  <span className="capitalize">{note.category}</span>
                  <span>{note.date}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 line-clamp-3">{note.content}</p>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="outline" size="sm">View</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {filteredNotes.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No notes found. Create a new one!
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteDashboard;