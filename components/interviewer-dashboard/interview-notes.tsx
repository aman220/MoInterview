'use client';

import { useState } from 'react';
import { Search, Plus, Trash2, Edit2, FileText, Tag, Calendar, User } from 'lucide-react';

interface Note {
  id: string;
  candidateName: string;
  position: string;
  date: string;
  content: string;
  tags: string[];
  highlights: string[];
}

const mockNotes: Note[] = [
  {
    id: '1',
    candidateName: 'Sarah Chen',
    position: 'Senior React Developer',
    date: '2024-06-15',
    content:
      'Strong technical foundation. Excellent problem-solving approach. Asked great follow-up questions about system design. Need to improve on soft skills and team collaboration.',
    tags: ['Technical', 'Strong'],
    highlights: ['Problem-solving', 'System design'],
  },
  {
    id: '2',
    candidateName: 'James Wilson',
    position: 'Full Stack Engineer',
    date: '2024-06-10',
    content:
      'Good understanding of full stack concepts. Well-prepared. Clear communication. Could improve on database optimization knowledge. Good cultural fit.',
    tags: ['Prepared', 'Communication'],
    highlights: ['Full stack', 'Cultural fit'],
  },
  {
    id: '3',
    candidateName: 'Emma Rodriguez',
    position: 'Product Manager',
    date: '2024-06-08',
    content:
      'Product thinking is excellent. Asks the right questions. Good at prioritization. Needs more experience with technical metrics. Overall strong candidate.',
    tags: ['PM Skills', 'Excellent'],
    highlights: ['Product thinking', 'Prioritization'],
  },
  {
    id: '4',
    candidateName: 'Michael Tang',
    position: 'DevOps Engineer',
    date: '2024-06-05',
    content:
      'Deep knowledge of cloud platforms. Hands-on experience with Kubernetes. Good documentation practices. Communication could be better. Strong technical candidate.',
    tags: ['Infrastructure', 'Expert'],
    highlights: ['Kubernetes', 'Cloud platforms'],
  },
  {
    id: '5',
    candidateName: 'Lisa Anderson',
    position: 'Senior React Developer',
    date: '2024-06-01',
    content:
      'Exceptional technical skills. Clean code approach. Great at explaining complex concepts. Leadership potential. Would be a strong addition to the team.',
    tags: ['Technical', 'Leader'],
    highlights: ['Code quality', 'Leadership'],
  },
];

export function InterviewNotes() {
  const [notes, setNotes] = useState(mockNotes);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [showNewNote, setShowNewNote] = useState(false);
  const [newNote, setNewNote] = useState({
    candidateName: '',
    position: '',
    content: '',
    tags: [] as string[],
  });

  const allTags = [...new Set(notes.flatMap((n) => n.tags))];

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTag = !selectedTag || note.tags.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  const handleEditNote = (id: string, content: string) => {
    setEditingId(id);
    setEditContent(content);
  };

  const handleSaveEdit = (id: string) => {
    setNotes(notes.map((note) => (note.id === id ? { ...note, content: editContent } : note)));
    setEditingId(null);
    setEditContent('');
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleAddNote = () => {
    if (newNote.candidateName && newNote.position && newNote.content) {
      const id = (Math.max(...notes.map((n) => parseInt(n.id))) + 1).toString();
      setNotes([
        {
          id,
          candidateName: newNote.candidateName,
          position: newNote.position,
          date: new Date().toISOString().split('T')[0],
          content: newNote.content,
          tags: newNote.tags,
          highlights: [],
        },
        ...notes,
      ]);
      setNewNote({ candidateName: '', position: '', content: '', tags: [] });
      setShowNewNote(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Interview Notes</h1>
        <p className="text-sm text-gray-600 mt-1">Store and manage notes from your interviews</p>
      </div>

      {/* Search and Add */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by candidate, position, or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={() => setShowNewNote(!showNewNote)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          New Note
        </button>
      </div>

      {/* New Note Form */}
      {showNewNote && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm font-semibold text-gray-900 mb-3">Add New Interview Note</p>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Candidate name"
                value={newNote.candidateName}
                onChange={(e) => setNewNote({ ...newNote, candidateName: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Position"
                value={newNote.position}
                onChange={(e) => setNewNote({ ...newNote, position: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <textarea
              placeholder="Interview notes..."
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddNote}
                className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700"
              >
                Save Note
              </button>
              <button
                onClick={() => {
                  setShowNewNote(false);
                  setNewNote({ candidateName: '', position: '', content: '', tags: [] });
                }}
                className="px-4 py-2 bg-gray-200 text-gray-900 rounded text-sm font-medium hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tag Filter */}
      {allTags.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              selectedTag === null
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All Tags
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                selectedTag === tag
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Notes List */}
      <div className="space-y-3">
        {filteredNotes.map((note) => (
          <div key={note.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">{note.candidateName}</h3>
                <p className="text-xs text-gray-600">{note.position}</p>
              </div>
              <div className="flex items-center gap-2">
                {editingId !== note.id && (
                  <>
                    <button
                      onClick={() => handleEditNote(note.id, note.content)}
                      className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="p-1.5 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {editingId === note.id ? (
              <div className="space-y-3">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSaveEdit(note.id)}
                    className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-3 py-1 bg-gray-200 text-gray-900 rounded text-xs font-medium hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">{note.content}</p>

                {note.highlights.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-gray-600 mb-2">Key Points</p>
                    <div className="flex flex-wrap gap-2">
                      {note.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs"
                        >
                          ⚡ {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {note.tags.map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(note.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: '2-digit',
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {filteredNotes.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-600 text-sm">No interview notes found</p>
        </div>
      )}
    </div>
  );
}
