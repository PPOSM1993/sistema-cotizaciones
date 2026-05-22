"use client"

import DashboardFollowUps from "./DashboardFollowUps"
import DashboardStats from "./DashboardStats"
import DashboardStatusSummary from "./DashboardStatusSummary"
import DashboardTopClients from "./DashboardTopClients"
import DashboardRecentActivity from "./RecentActivity"

export default function DashboardClient() {
    return (
        <div className="space-y-6">

            <div className="space-y-3">
                <h1 className="text-3xl font-bold">
                    Dashboard
                </h1>
            </div>

            <DashboardStats />

            <div className="grid gap-6 lg:grid-cols-2">
                <DashboardRecentActivity />
                <DashboardFollowUps />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <DashboardTopClients />
                <DashboardStatusSummary />
            </div>

        </div>
    )
}