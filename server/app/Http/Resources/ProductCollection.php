<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ProductCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data' => ProductResource::collection($this->collection),
        ];
    }

    public function with(Request $request): array
    {
        $pagination = $this->resource->toArray();

        return [
            'links' => [
                'first' => $pagination['first_page_url'] ?? null,
                'last' => $pagination['last_page_url'] ?? null,
                'prev' => $pagination['prev_page_url'] ?? null,
                'next' => $pagination['next_page_url'] ?? null,
            ],
            'meta' => [
                'current_page' => $pagination['current_page'] ?? null,
                'from' => $pagination['from'] ?? null,
                'last_page' => $pagination['last_page'] ?? null,
                'path' => $pagination['path'] ?? null,
                'per_page' => (int) ($pagination['per_page'] ?? 0),
                'to' => $pagination['to'] ?? null,
                'total' => (int) ($pagination['total'] ?? 0),
            ],
        ];
    }
}
