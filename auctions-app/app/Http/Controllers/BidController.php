<?php

namespace App\Http\Controllers;

use App\Http\Resources\BidResource;
use App\Models\Auction;
use App\Models\Bid;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BidController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bids = Bid::all();
        if (is_null($bids) || count($bids) === 0) {
            return response()->json('No bids found!', 404);
        }
        return response()->json([
            'bids' =>  BidResource::collection($bids)
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
            'amount' => 'required|numeric|min:0',
            'auction_id' => 'required|exists:auctions,id',
        ]);

        $auction = Auction::find($validated['auction_id']);

        if (!$auction) {
            return response()->json(['error' => 'Auction not found'], 404);
        }

        if ($validated['amount'] <= $auction->highest_bid) {
            return response()->json(['error' => 'Bid must be higher than the current highest bid'], 422);
        }

        $validated['user_id'] = $request->user()->id;

        $bid = Bid::create($validated);
        $auction->update(['highest_bid' => $validated['amount']]);

        return new BidResource($bid);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $bid = Bid::find($id);
        if (is_null($bid)) {
            return response()->json('Bid not found', 404);
        }
        return response()->json([
            'bid' => new BidResource($bid)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Bid $bid)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Bid $bid)
    {
        if ($bid->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'amount' => 'nullable|numeric|min:0',
        ]);

        $auction = $bid->auction;

        if ($validated['amount'] <= $auction->highest_bid) {
            return response()->json(['error' => 'Bid must be higher than the current highest bid'], 422);
        }

        $bid->update($validated);

        $highestBid = $auction->bids()->max('amount');
        $auction->update(['highest_bid' => $highestBid]);

        return new BidResource($bid);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Bid $bid)
    {
        if ($bid->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $auction = $bid->auction;

        $bid->delete();

        $highestBid = $auction->bids()->max('amount') ?? $auction->start_price;
        $auction->update(['highest_bid' => $highestBid]);

        return response()->json(['message' => 'Bid deleted successfully']);
    }
}
