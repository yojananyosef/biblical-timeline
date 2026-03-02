module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/data/events.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v([{"id":"1","era":"AGE of PATRIARCHS","eraDescription":"Desde la creación hasta el establecimiento de la promesa con los patriarcas.","title":"La Creación","description":"Dios crea los cielos, la tierra y todo lo que en ellos hay en seis días.","verse":"Génesis 1:1","date":"4004 a.C.","year":-4004,"category":"PRIMERA GENERACIÓN","importance":5},{"id":"2","era":"AGE of PATRIARCHS","eraDescription":"Desde la creación hasta el establecimiento de la promesa con los patriarcas.","title":"El Arca de Noé","description":"El gran diluvio y la preservación de Noé y su familia.","verse":"Génesis 6-9","date":"2348 a.C.","year":-2348,"category":"NOÉ Y EL DILUVIO","importance":4},{"id":"3","era":"AGE of PATRIARCHS","eraDescription":"Desde la creación hasta el establecimiento de la promesa con los patriarcas.","title":"El Llamado de Abraham","description":"Dios llama a Abram a salir de Ur y le promete una gran nación.","verse":"Génesis 12","date":"1921 a.C.","year":-1921,"category":"LOS PATRIARCAS","importance":5},{"id":"4","era":"AGE of ISRAEL","eraDescription":"La historia de la nación judía, desde el Éxodo hasta los profetas.","title":"El Éxodo","description":"Moisés guía al pueblo de Israel fuera de Egipto cruzando el Mar Rojo.","verse":"Éxodo 14","date":"1446 a.C.","year":-1446,"category":"EGIPTO A CANAÁN","importance":5},{"id":"5","era":"AGE of ISRAEL","eraDescription":"La historia de la nación judía, desde el Éxodo hasta los profetas.","title":"El Reinado de David","description":"David es ungido rey y establece a Jerusalén como capital.","verse":"2 Samuel 5","date":"1010 a.C.","year":-1010,"category":"REINO UNIDO","importance":5},{"id":"6","era":"AGE of CHRIST","eraDescription":"La vida de Jesús, el nacimiento de la iglesia y el cumplimiento profético.","title":"Nacimiento de Jesús","description":"El Mesías nace en Belén de Judá según las profecías.","verse":"Lucas 2","date":"4 a.C.","year":-4,"category":"VIDA DE CRISTO","importance":5},{"id":"7","era":"AGE of CHRIST","eraDescription":"La vida de Jesús, el nacimiento de la iglesia y el cumplimiento profético.","title":"Crucifixión y Resurrección","description":"Jesús muere por nuestros pecados y resucita al tercer día.","verse":"Mateo 27-28","date":"30 d.C.","year":30,"category":"IGLESIA PRIMITIVA","importance":5}]);}),
"[project]/src/app/api/events/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$events$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/src/data/events.json (json)");
;
;
async function GET() {
    try {
        // Sort events by year
        const sortedEvents = [
            ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$events$2e$json__$28$json$29$__["default"]
        ].sort((a, b)=>a.year - b.year);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(sortedEvents);
    } catch (error) {
        console.error("Error fetching events:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Error fetching events"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c2b1d37e._.js.map