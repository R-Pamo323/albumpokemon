/*Nos puede ser vir para cualquier proyecto ya que es JS.*/

export const helpHttp = () => {
  const customFetch = (endpoint, options) => {
    const defaultHeader = {
      accept: "application/json", //estas peticiones de la cabecera JSON
    };

    const controller = new AbortController(); //CUANDO NO HAY RESPUESTA DEL servidor pueda abortarlo para no quedarnos ahi
    options.signal = controller.signal; //por si la api no responde se puede cancelar la peticion.

    options.method = options.method || "GET";
    options.headers = options.headers //lo que hacemos es mezclar las cabeceras que tenemos mas la cabeceras que nos envia el usuario
      ? { ...defaultHeader, ...options.headers }
      : defaultHeader; //si es que no envia el usuario cabecera tenemos la de pordefecto que es la DE jsoN

    options.body = JSON.stringify(options.body) || false; //Lo transformamos a cadena de texto
    if (!options.body) delete options.body; //elimina el body si es que no se envia algo al body como un GET.

    //console.log(options);
    setTimeout(() => controller.abort(), 10000);

    return fetch(endpoint, options)
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject({
              err: true,
              status: res.status || "00",
              statusText: res.statusText || "Ocurrio un error",
            })
      )
      .catch((err) => err);
  };

  const get = (url, options = {}) => customFetch(url, options);

  const post = (url, options = {}) => {
    options.method = "POST";
    return customFetch(url, options);
  };

  const put = (url, options = {}) => {
    options.method = "PUT";
    return customFetch(url, options);
  };

  const del = (url, options = {}) => {
    options.method = "DELETE";
    return customFetch(url, options);
  };

  return {
    get,
    post,
    put,
    del,
  };
};
