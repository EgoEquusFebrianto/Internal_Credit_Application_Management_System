<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('nama_lengkap', 150);
            $table->string('tipe_pengajuan');
            $table->unsignedBigInteger('nominal');
            $table->integer('tenor');
            $table->unsignedBigInteger('pendapatan_bulanan');
            $table->string('status')->default('PENDING');
            $table->text('catatan')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};