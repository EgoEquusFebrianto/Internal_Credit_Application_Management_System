<?php

namespace App\Http\Controllers;

use App\Enums\StatusPengajuan;
use App\Http\Requests\ClientRequest;
use App\Http\Requests\UpdateStatusClientRequest;
use App\Http\Resources\ClientResource;
use App\Models\Client;
use App\Services\ClientService;
use Illuminate\Http\JsonResponse;
use DomainException;

class ClientController extends Controller
{
    public function __construct(
        private readonly ClientService $service
    ) {}

    public function index(): JsonResponse
    {
        $clients = Client::latest()->get();
        return response()->json([
            'message' => 'Data pengajuan berhasil diambil.',
            'data' => ClientResource::collection($clients),
        ]);
    }

    public function show(Client $client): JsonResponse
    {
        return response()->json([
            'message' => 'Detail pengajuan berhasil diambil',
            'data' => new ClientResource($client),
        ]);
    }

    public function store(ClientRequest $request): JsonResponse
    {
        try {
            $client = $this->service->create($request->validated());

            return response()->json([
                'message' => 'Pengajuan berhasil dibuat.',
                'data' => new ClientResource($client),
            ], 201);
        } catch (DomainException $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 422);
        }
    }

    public function update(Client $client, UpdateStatusClientRequest $request): JsonResponse
    {
        try {
            $status = StatusPengajuan::from(
                $request->validated()['status']
            );

            $client = $this->service->updateStatus(
                $client,
                $status    
            );

            return response()->json([
                'message' => 'Status pengajuan berhasil diperbaharui.',
                'data' => new ClientResource($client),
            ]);
            
        } catch (DomainException $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 422);
        }
    }
}