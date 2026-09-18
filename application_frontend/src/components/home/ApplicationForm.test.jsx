import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ApplicationForm } from "./ApplicationForm";
import { describe, expect, test, vi } from "vitest";

describe("ApplicationForm", () => {
    test("dapat mengirim data pengajuan dengan format yang benar", async () => {
        const user = userEvent.setup();
        const onSubmit = vi.fn().mockResolvedValue(true);
        
        render(
            <ApplicationForm onSubmit={onSubmit} />
        );

        await user.type(
            screen.getByLabelText("Nama Lengkap"),
            "Febrianto Kudadiri"
        );

        await user.selectOptions(
            screen.getByLabelText("Tipe Pengajuan"),
            "MOTOR"
        );

        await user.type(
            screen.getByLabelText("Nominal Pengajuan"),
            "12000000"
        );

        await user.type(
            screen.getByLabelText("Tenor"),
            "12"
        );

        await user.type(
            screen.getByLabelText("Pendapatan Bulanan"),
            "5000000"
        );

        await user.type(
            screen.getByLabelText("Catatan"),
            "Pengajuan kendaraan"
        );

        await user.click(
            screen.getByRole("button", {
                name: "Simpan Pengajuan"
            })
        );

        expect(onSubmit).toHaveBeenCalledWith({
            nama_lengkap: "Febrianto Kudadiri",
            tipe_pengajuan: "MOTOR",
            nominal: 12000000,
            tenor: 12,
            pendapatan_bulanan: 5000000,
            catatan: "Pengajuan kendaraan",
        });
    });


    test("tidak mereset form jika pengajuan tidak berhasil", async () => {
        const user = userEvent.setup();
        const onSubmit = vi.fn().mockResolvedValue(false);

        render(
            <ApplicationForm onSubmit={onSubmit} />
        );

        const nameInput = screen.getByLabelText("Nama Lengkap");

        await user.type(
            nameInput,
            "Febrianto Kudadiri"
        );

        await user.click(
            screen.getByRole("button", {
                name: "Simpan Pengajuan"
            })
        );

        expect(nameInput).toHaveValue(
            "Febrianto Kudadiri"
        );
    });


    test("mereset form setelah pengajuan berhasil", async () => {
        const user = userEvent.setup();
        const onSubmit = vi.fn().mockResolvedValue(true);

        render(
            <ApplicationForm onSubmit={onSubmit} />
        );

        const nameInput = screen.getByLabelText("Nama Lengkap");

        await user.type(
            nameInput,
            "Febrianto Kudadiri"
        );

        await user.click(
            screen.getByRole("button", {
                name: "Simpan Pengajuan"
            })
        );

        expect(nameInput).toHaveValue("");
    });


    test("dapat menerima input nama nasabah", async () => {
        const user = userEvent.setup();
        const onSubmit = vi.fn();

        render(
            <ApplicationForm onSubmit={onSubmit} />
        );

        const nameInput = screen.getByLabelText("Nama Lengkap");

        await user.type(
            nameInput,
            "Febrianto Kudadiri"
        );

        expect(nameInput).toHaveValue(
            "Febrianto Kudadiri"
        );
    });

});