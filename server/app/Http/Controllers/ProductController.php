<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Http\Requests\ProductIndexRequest;
use App\Http\Resources\ProductCollection;
use App\Http\Resources\ProductResource;
use App\Services\ProductService;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function __construct(private readonly ProductService $service) {}

    /**
     * Display a listing of the resource.
     */
    public function index(ProductIndexRequest $request)
    {
        $perPage = (int) ($request->query('per_page', 15));
        $filters = [
            'category_id' => $request->query('category_id'),
            'category' => $request->query('category'),
            'min_price' => $request->query('min_price'),
            'max_price' => $request->query('max_price'),
            'min_rating' => $request->query('min_rating'),
            'search' => $request->query('search'),
            'q' => $request->query('q'),
            'favorites_only' => $request->query('favorites_only'),
            'sort' => $request->query('sort'),
            // single default user
            'user_id' => 1,
        ];
        $products = $this->service->listProducts($filters, $perPage);
        return new ProductCollection($products);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductRequest $request)
    {
        $product = $this->service->createProduct($request->validated());
        return (new ProductResource($product))->response()->setStatusCode(201);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        $product = $this->service->getProduct($id);
        abort_if(!$product, 404);
        return new ProductResource($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductRequest $request, int $id)
    {
        $product = $this->service->updateProduct($id, $request->validated());
        abort_if(!$product, 404);
        return new ProductResource($product);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $deleted = $this->service->deleteProduct($id);
        abort_if(!$deleted, 404);
        return response()->noContent();
    }

    public function favorite(int $id)
    {
        $product = $this->service->getProduct($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        // Один дефолтный пользователь
        $added = $this->service->favoriteProduct($id, 1);
        return response()->json(['favorited' => $added]);
    }

    public function unfavorite(int $id)
    {
        $product = $this->service->getProduct($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        $removed = $this->service->unfavoriteProduct($id, 1);
        return response()->json(['favorited' => !$removed]);
    }
}
