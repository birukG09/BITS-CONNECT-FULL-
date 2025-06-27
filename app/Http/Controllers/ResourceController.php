<?php

namespace App\Http\Controllers;

use App\Models\Resource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ResourceController extends Controller
{
    public function index(Request $request)
    {
        $query = Resource::where('approved', true)->with('uploader');
        
        if ($request->has('search') && $request->search) {
            $query->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
        }
        
        if ($request->has('category') && $request->category) {
            $query->where('category', $request->category);
        }
        
        if ($request->has('type') && $request->type) {
            $query->where('type', $request->type);
        }
        
        $resources = $query->latest()->paginate(12);
        $categories = Resource::distinct()->pluck('category');
        $types = Resource::distinct()->pluck('type');
        
        return view('library.index', compact('resources', 'categories', 'types'));
    }

    public function show(Resource $resource)
    {
        $resource->incrementViews();
        $relatedResources = Resource::where('category', $resource->category)
            ->where('id', '!=', $resource->id)
            ->where('approved', true)
            ->take(4)
            ->get();
        
        return view('library.show', compact('resource', 'relatedResources'));
    }

    public function create()
    {
        return view('library.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'required|string',
            'type' => 'required|string',
            'file' => 'required|file|max:51200', // 50MB max
        ]);

        $file = $request->file('file');
        $fileName = time() . '_' . $file->getClientOriginalName();
        $filePath = $file->storeAs('resources', $fileName, 'public');
        
        Resource::create([
            'title' => $request->title,
            'description' => $request->description,
            'category' => $request->category,
            'type' => $request->type,
            'file_path' => $filePath,
            'file_size' => $file->getSize(),
            'uploader_id' => Auth::id(),
        ]);

        return redirect()->route('library.index')
            ->with('success', 'Resource uploaded successfully! It will be available after admin approval.');
    }

    public function download(Resource $resource)
    {
        $resource->incrementDownloads();
        return Storage::disk('public')->download($resource->file_path, $resource->title);
    }
}
