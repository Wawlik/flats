export default {
	methods: {
		notifyOk(msg, timeout) {
			if (!msg) {
				msg = 'Операция успешно выполнена';
			}
			if (window && window.UIkit) {
				window.UIkit.notification({
					message: msg,
					status: 'success',
					timeout: timeout || 3000,
					pos: 'top-right'
				});
			}
		},
		notifyWarn(msg, timeout) {
			if (!msg) {
				msg = 'Что-то пошло не так';
			}
			if (window && window.UIkit) {
				window.UIkit.notification({
					message: msg,
					status: 'warning',
					timeout: timeout || 3000,
					pos: 'top-right'
				});
			}
		},
		notifyErr(msg, timeout) {
			if (!msg) {
				msg = 'Что-то пошло не так, попытайтесь обновить страницу';
			}
			if (window && window.UIkit) {
				window.UIkit.notification({
					message: msg,
					status: 'danger',
					timeout: timeout || 5000,
					pos: 'top-right'
				});
			}
		},
	}
};
