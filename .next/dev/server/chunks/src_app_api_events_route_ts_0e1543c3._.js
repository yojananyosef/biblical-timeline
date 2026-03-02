module.exports = [
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

//# sourceMappingURL=src_app_api_events_route_ts_0e1543c3._.js.map