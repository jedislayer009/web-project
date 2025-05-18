import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, DollarSign, Receipt, Calendar, Download, Clock } from "lucide-react"

export default function Payments() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Payments</h1>
        <p className="text-muted-foreground">Manage your medical bills and payments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Outstanding Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$240.00</div>
            <p className="text-xs text-muted-foreground">Across 2 unpaid invoices</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Next Payment Due</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$120.00</div>
            <p className="text-xs text-muted-foreground">Due in 5 days (April 27, 2025)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Year-to-Date Paid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$850.00</div>
            <p className="text-xs text-muted-foreground">Across 5 payments</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="unpaid">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="unpaid">Unpaid Bills</TabsTrigger>
          <TabsTrigger value="paid">Payment History</TabsTrigger>
          <TabsTrigger value="insurance">Insurance Claims</TabsTrigger>
        </TabsList>
        <TabsContent value="unpaid" className="space-y-4 pt-4">
          {[
            {
              id: "INV-2023-042",
              date: "March 15, 2023",
              dueDate: "April 27, 2025",
              amount: 120.0,
              description: "Annual Physical Examination",
              provider: "City Medical Center",
            },
            {
              id: "INV-2023-039",
              date: "March 2, 2023",
              dueDate: "May 10, 2025",
              amount: 120.0,
              description: "Laboratory Tests",
              provider: "LabCorp Services",
            },
          ].map((bill, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Receipt className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{bill.description}</h3>
                      <p className="text-sm text-muted-foreground">
                        {bill.provider} • {bill.id}
                      </p>
                      <div className="mt-2 flex items-center gap-3 text-sm">
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          <span>Invoice: {bill.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          <span>Due: {bill.dueDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="text-xl font-bold">${bill.amount.toFixed(2)}</div>
                    <Button>Pay Now</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="paid" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Your past payments and receipts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: "PMT-2023-028",
                    date: "February 10, 2023",
                    amount: 250.0,
                    description: "Specialist Consultation",
                    provider: "Cardiology Associates",
                  },
                  {
                    id: "PMT-2023-015",
                    date: "January 22, 2023",
                    amount: 180.0,
                    description: "X-Ray Services",
                    provider: "City Medical Center",
                  },
                  {
                    id: "PMT-2022-098",
                    date: "December 15, 2022",
                    amount: 420.0,
                    description: "Emergency Room Visit",
                    provider: "Memorial Hospital",
                  },
                ].map((payment, index) => (
                  <div key={index} className="flex items-center justify-between pb-4 border-b last:border-0">
                    <div>
                      <p className="font-medium">{payment.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {payment.provider} • {payment.date}
                      </p>
                      <p className="text-sm text-muted-foreground">{payment.id}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="font-bold">${payment.amount.toFixed(2)}</span>
                      <Button variant="ghost" size="sm">
                        <Download className="mr-1 h-3 w-3" />
                        Receipt
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="insurance" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Insurance Claims</CardTitle>
              <CardDescription>Status of your insurance claims</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Insurance claims content will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>Manage your payment options</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-2">
                  <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium">Visa ending in 4242</p>
                  <p className="text-sm text-muted-foreground">Expires 04/2026</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  Default
                </Button>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              <CreditCard className="mr-2 h-4 w-4" />
              Add Payment Method
            </Button>
          </div>
        </CardContent>
        <CardFooter className="border-t bg-muted/50 px-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <DollarSign className="h-4 w-4" />
            <span>All payments are securely processed and encrypted</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
