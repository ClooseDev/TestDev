const BL_URL = '/api/';

export default {

   delete: function (id) {
      const requestUrl = BL_URL + 'tasks/' + id;

      const requestOptions = {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json'
         }
      };

      return new Promise((resolve, reject) => {
         fetch(requestUrl, requestOptions)
            .then(res => {
               if (res.ok) {
                  console.log('Task deleted successfully');
                  resolve();
               } else {
                  console.log('Couldn\'t delete task');
                  reject();
               }
            })
            .catch(err => {
               console.log(err);
            });
      });
   },

   deleteAll: function () {
      const requestUrl = BL_URL + 'tasks';

      const requestOptions = {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json'
         }
      };

      return new Promise((resolve, reject) => {
         fetch(requestUrl, requestOptions)
            .then(res => {
               if (res.ok) {
                  console.log('Tasks deleted successfully');
                  resolve();
               } else {
                  console.log('Couldn\'t delete tasks');
                  reject();
               }
            })
            .catch(err => {
               console.log(err);
            });
      });
   },

   edit: function (id, text) {
      const requestUrl = BL_URL + 'tasks/' + id;

      const requestOptions = {
         method: 'POST',
         credentials: 'include',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            'description': text
         })
      };

      return new Promise((resolve, reject) => {
         fetch(requestUrl, requestOptions)
            .then(res => {
               if (res.ok) {
                  console.log('Task updated successfully');
                  resolve();
               } else {
                  console.log('Couldn\'t update task');
                  reject();
               }
            })
            .catch(err => {
               console.log(err);
            });
      });
   },

   getAll: function () {
      let options = {
         method: 'GET',
         credentials: 'include',
         headers: {
            'cache-control': 'no-cache'
         }
      };

      return new Promise((resolve, reject) => {
         fetch(BL_URL + 'tasks', options)
            .then(res => res.json())
            .then(tasks => {
               resolve(tasks);
            })
            .catch(err => {
               console.log('Couldn\'t load tasks');
               console.log(err);
               reject();
            })
      });
   },

   add: function (text) {
      let options = {
         method: 'POST',
         credentials: 'include',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            'description': text
         })
      };

      return new Promise((resolve, reject) => {
         fetch(BL_URL + 'tasks', options)
            .then(res => res.json())
            .then(task => {
               console.log('Task added successfully');
               console.log(task);
               resolve();
            })
            .catch(err => {
               console.log(err);
               reject();
            })
      });
   }
}