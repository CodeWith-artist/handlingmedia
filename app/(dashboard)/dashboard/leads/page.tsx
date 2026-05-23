// app/dashboard/leads/page.tsx
import { requireRole } from "@/lib/auth/session";
import { prisma }      from "@/lib/prisma";

export default async function LeadsPage() {
  await requireRole("ADMIN");

  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-white mb-8">
        Leads
        <span className="ml-3 text-sm font-normal text-gray-400">
          {leads.length} total
        </span>
      </h1>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800 text-gray-500 text-xs uppercase">
              <th className="text-left px-6 py-4">Name</th>
              <th className="text-left px-4 py-4">Service</th>
              <th className="text-left px-4 py-4">Status</th>
              <th className="text-left px-4 py-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-800/50 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-medium text-white">{lead.name}</p>
                  <p className="text-gray-500 text-xs">{lead.email}</p>
                </td>
                <td className="px-4 py-4 text-gray-400">{lead.service}</td>
                <td className="px-4 py-4">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-medium
                    ${lead.status === "NEW"
                      ? "bg-orange-500/20 text-orange-400"
                      : lead.status === "CONVERTED"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-gray-700 text-gray-400"
                    }`}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-gray-500 text-xs">
                  {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric", month: "short", year: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}