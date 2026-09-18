import Swal from 'sweetalert2'

/**
 * @param {import('axios').AxiosError} params
 */
export const showValidationError = (params) => {
    const errors = params.response?.data?.errors;

    if (!errors) {
        Swal.fire({
            icon: "error",
            title: "Terjadi kesalahan",
            text:
               params.response?.data?.message ??
               "Terjadi kesalahan pada server.",
            confirmButtonText: "Ok", 
        });

        return;
    }

    const messages = Object.values(errors)
        .flat()
        .map((message) => `<li>${message}</li>`)
        .join("");

    Swal.fire({
        icon: "error",
        title: "Data Tidak Valid",
        html: `
            <ul style="text-align: left;">
                ${messages}
            </ul>
        `,
        confirmButtonText: "Ok",
    });
};

export const showStatusConfirmation = (status) => {
    const isApproved = status === "DISETUJUI";

    return Swal.fire({
        icon: "question",
        title: isApproved ? "Pengajuan Disetujui" : "Pengajuan Ditolak",
        text: isApproved
            ? "Apakah Anda yakin ingin menyetujui pengajuan ini?"
            : "Apakah Anda yakin ingin menolak pengajuan ini?",
            confirmButtonText: isApproved ? "Ya, Setujui" : "Ya, Tolak",
        showCancelButton: true,
        cancelButtonText: "Batal",
        reverseButtons: true,
    });
};

export const showErrorAlert = (message) => {
    return Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: message,
        confirmButtonText: "OK",
    });
};

export const showSuccessAlert = (message) => {
    return Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: message,
        confirmButtonText: "OK",
    });
};