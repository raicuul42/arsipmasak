import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function useSwal() {
    const askPublish = ({ url, method = 'post', data = [] }) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This article will be published',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, publish it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
        }).then((value) => {
            if (value.isConfirmed) {
                router[method](url, data, {
                    preserveScroll: true,
                });
                
                Swal.fire({
                    title: 'Published!',
                    text: 'This article has been published',
                    icon: 'success'
                });
            } else if (value.dismiss === Swal.DismissReason.cancel){
                Swal.fire({
                    title: 'Cancelled',
                    text: "This article didn't get published :)",
                    icon: 'error'
                });
            }
        });
    };

    const askDelete = ({ url, method = 'post', data = [] }) => {
        Swal.fire({
            title: 'Are You Sure',
            text: 'This article will be deleted',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
        }).then((value) => {
            if (value.isConfirmed) {
                router[method](url, data, {
                    preserveScroll: true,
                });
                
                Swal.fire({
                    title: 'Deleted!',
                    text: 'This article has been deleted',
                    icon: 'success'
                });
            } else if (value.dismiss === Swal.DismissReason.cancel){
                Swal.fire({
                    title: 'Cancelled',
                    text: "This article is safe :)",
                    icon: 'error'
                });
            }
        });
    };

    return { askDelete, askPublish };
}
