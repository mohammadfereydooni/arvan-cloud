import { toast } from "vue3-toastify";

const notificationService = {
    success(message, options = {}) {
        toast.success(message, {
            ...options,
            position: options.position || "top-right",
        });
    },
    error(message, options = {}) {
        toast.error(message, {
            ...options,
            position: options.position || "top-right",
        });
    },
    info(message, options = {}) {
        toast.info(message, {
            ...options,
            position: options.position || "top-right",
        });
    },
    warn(message, options = {}) {
        toast.warn(message, {
            ...options,
            position: options.position || "top-right",
        });
    },
    custom(message, options = {}) {
        toast(message, {
            ...options,
            position: options.position || "top-right",
        });
    },
};

export default notificationService;
