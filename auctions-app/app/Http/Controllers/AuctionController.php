<?php

namespace App\Http\Controllers;

use App\Http\Resources\AuctionResource;
use App\Models\Auction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuctionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $auctions = Auction::all();
        if (is_null($auctions) || count($auctions) === 0) {
            return response()->json('No auctions found!', 404);
        }
        return response()->json([
            'auctions' =>  AuctionResource::collection($auctions)
        ]);
    }

    public function pagination($page, Request $request)
    {
        $perPage = $request->query('per_page', 5);
        $skip = ($page - 1) * $perPage;

        $auctions = Auction::skip($skip)->take($perPage)->get();

        if (is_null($auctions) || count($auctions) === 0) {
            return response()->json('No auctions found!', 404);
        }
        return response()->json([
            'auctions' => AuctionResource::collection($auctions)
        ]);
    }

    public function filter(Request $request)
    {
        $query = Auction::query();

        if ($request->has('title')) {
            $query->where('title', 'like', '%' . $request->title . '%');
        }

        if ($request->has('description')) {
            $query->where('description', 'like', '%' . $request->description . '%');
        }

        if ($request->has('start_price')) {
            $query->where('start_price', '<=', $request->start_price);
        }

        if ($request->has('highest_bid')) {
            $query->where('highest_bid', '<=', $request->highest_bid);
        }

        $auctions = $query->get();
        $count = $auctions->count();

        return response()->json([
            'count' => $count,
            'auctions' => AuctionResource::collection($auctions)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255|unique:auctions',
            'description' => 'nullable|string',
            'start_price' => 'required|numeric|min:0',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
            'category_id' => 'required|exists:categories,id',
        ]);

        $validated['user_id'] = $request->user()->id;

        $auction = Auction::create($validated);
        return new AuctionResource($auction);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $auction = Auction::find($id);
        if (is_null($auction)) {
            return response()->json('Auction not found', 404);
        }
        return response()->json([
            'auction' => new AuctionResource($auction)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Auction $auction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Auction $auction)
    {
        if ($auction->user_id !== Auth::id() && !Auth::user()->is_admin) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'start_price' => 'nullable|numeric|min:0',
            'start_time' => 'nullable|date',
            'end_time' => 'nullable|date|after:start_time',
            'category_id' => 'nullable|exists:categories,id',
        ]);

        $auction->update($validated);
        return new AuctionResource($auction);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Auction $auction)
    {
        if ($auction->user_id !== Auth::id() && !Auth::user()->is_admin) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $auction->delete();
        return response()->json(['message' => 'Auction deleted successfully']);
    }
}
