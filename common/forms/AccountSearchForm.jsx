"use client";
import { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IoMail, IoPrint, IoSearch, IoShareSocial } from "react-icons/io5";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { useDeposit } from "@/container/deposit/deposit/Hooks";
import AccountSearchTable from "../tables/AccountSearchTable";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import getSessionStorageData from "@/utils/getSessionStorageData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaDownload, FaWhatsapp } from "react-icons/fa6";
import jsPDF from "jspdf";
import "jspdf-autotable";

const AccountSearchForm = ({ handleSubmit, showLedger = false }) => {
  const [dialougeOpen, setDialougeOpen] = useState(false);
  const [userName, setUserName] = useState("");

  const { getAccountListApiCall } = useDeposit();

  const formSchema = yup.object({
    accountNo: yup.string(),
    date: yup.date().required("Opening date is required"),
  });
  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      accountNo: "",
      date: null,
    },
  });

  const handleSearchAccountListByMemberNo = () => {
    if (form.getValues("dialougeMemberNo"))
      getAccountListApiCall(2, form.getValues("dialougeMemberNo"));
    else toast.error("Please enter member no.");
  };

  const handleSearchAccountListByName = () => {
    if (form.getValues("dialougeAccountName"))
      getAccountListApiCall(1, form.getValues("dialougeAccountName"));
    else toast.error("Please enter name");
  };

  const handleSelectClick = (data) => {
    form.setValue("accountNo", data.Account_No);
    setDialougeOpen(false);
  };

  const accountListData = useSelector(
    (state) => state?.deposit?.searchAccountData
  );

  const tableData = [
    {
      date: "10 Apr 2024",
      particulars: "By Balance",
      withdrawal: "",
      deposit: "",
      interest: "",
      Balance: "0.00",
    },
    {
      date: "16 Jun 2024",
      particulars: "Loan Issued to 25253648243",
      withdrawal: "",
      deposit: "30000.00",
      interest: "",
      Balance: "30000.00",
    },
    {
      date: "6 Aug 2024",
      particulars: "To misc. charge",
      withdrawal: "500.00",
      deposit: "",
      interest: "",
      Balance: "29500.00",
    },
    {
      date: "12 Aug 2024",
      particulars: "Loan issued to 1002534614321",
      withdrawal: "",
      deposit: "12000.00",
      interest: "",
      Balance: "41500.00",
    },
    {
      date: "12 Aug 2024",
      particulars: "Loan issued to 1002534614321",
      withdrawal: "",
      deposit: "12000.00",
      interest: "",
      Balance: "41500.00",
    },
    {
      date: "12 Aug 2024",
      particulars: "Loan issued to 1002534614321",
      withdrawal: "",
      deposit: "12000.00",
      interest: "",
      Balance: "41500.00",
    },
    {
      date: "12 Aug 2024",
      particulars: "Loan issued to 1002534614321",
      withdrawal: "",
      deposit: "12000.00",
      interest: "",
      Balance: "41500.00",
    },
    {
      date: "12 Aug 2024",
      particulars: "Loan issued to 1002534614321",
      withdrawal: "",
      deposit: "12000.00",
      interest: "",
      Balance: "41500.00",
    },
    {
      date: "12 Aug 2024",
      particulars: "Loan issued to 1002534614321",
      withdrawal: "",
      deposit: "12000.00",
      interest: "",
      Balance: "41500.00",
    },
    {
      date: "12 Aug 2024",
      particulars: "Loan issued to 1002534614321",
      withdrawal: "",
      deposit: "12000.00",
      interest: "",
      Balance: "41500.00",
    },
    {
      date: "12 Aug 2024",
      particulars: "Loan issued to 1002534614321",
      withdrawal: "",
      deposit: "12000.00",
      interest: "",
      Balance: "41500.00",
    },
    {
      date: "12 Aug 2024",
      particulars: "Loan issued to 1002534614321",
      withdrawal: "",
      deposit: "12000.00",
      interest: "",
      Balance: "41500.00",
    },
    {
      date: "12 Aug 2024",
      particulars: "Loan issued to 1002534614321",
      withdrawal: "",
      deposit: "12000.00",
      interest: "",
      Balance: "41500.00",
    },
    {
      date: "12 Aug 2024",
      particulars: "Loan issued to 1002534614321",
      withdrawal: "",
      deposit: "12000.00",
      interest: "",
      Balance: "41500.00",
    },
    {
      date: "12 Aug 2024",
      particulars: "Loan issued to 1002534614321",
      withdrawal: "",
      deposit: "12000.00",
      interest: "",
      Balance: "41500.00",
    },
  ];

  const createHeaders = (keys) => {
    const result = [];

    for (let key of keys) {
      result.push({
        id: key,
        name: key,
        promt: key,
      });
    }

    return result;
  };

  const convertTableData = (data) => {
    return data.map((item, index) => [
      (index + 1).toString(), // Serial No.
      item.date, // Date
      item.particulars, // Particulars
      item.withdrawal || "", // Withdrawals
      item.deposit || "", // Deposit
      item.interest || "", // Interest
      item.Balance, // Balance
    ]);
  };

  const generatePDF = () => {
    const doc = new jsPDF("p", "mm", "a4");

    // Define a function to calculate text width
    const getTextWidth = (text, fontSize = 10) => {
      doc.setFontSize(fontSize);
      return doc.getTextWidth(text);
    };

    const sectionX = 3;
    const sectionY = 15;
    const sectionWidth = doc.internal.pageSize.getWidth() - 6;
    const sectionHeight = 40;

    // Draw the background
    doc.setFillColor(215, 230, 244); // Set the background color (secondary)
    doc.rect(sectionX, sectionY, sectionWidth, sectionHeight, "F"); // "F" fills the rectangle

    // Set dashed border
    doc.setDrawColor(0); // Set the border color (black)
    doc.setLineWidth(0.5); // Set the border thickness
    doc.setLineDash([2, 2], 0); // Set the dashed pattern [dash length, gap length]
    doc.rect(sectionX, sectionY, sectionWidth, sectionHeight, "D"); // "D" draws the rectangle with a border

    // Reset line dash to solid for other drawings
    doc.setLineDash([]);

    // Adding the section at the top of the first page
    const maxWidth = 50;
    // Adding the section at the top of the first page with fixed width
    doc.setFontSize(10);
    doc.text(
      doc.splitTextToSize("Depositor Name : Surojit Polley", maxWidth),
      5,
      20
    );
    doc.text(
      doc.splitTextToSize("Guardian Name : Pintu Polley", maxWidth),
      5,
      30
    );
    doc.text(doc.splitTextToSize("Reference A/C : ", maxWidth), 5, 40);
    doc.text(doc.splitTextToSize("Operation Mode : Single", maxWidth), 5, 50);

    doc.text(
      doc.splitTextToSize("Product Name : Savings Deposit", maxWidth),
      57,
      20
    );
    doc.text(doc.splitTextToSize("L/F No. : ", maxWidth), 57, 30);
    doc.text(doc.splitTextToSize("Date of Op : 20 Sep 2024", maxWidth), 57, 40);

    doc.text(doc.splitTextToSize("A/C No. : 100121002681", maxWidth), 109, 20);
    doc.text(doc.splitTextToSize("Status : Active", maxWidth), 109, 30);
    doc.text(doc.splitTextToSize("Maturity Date : ", maxWidth), 109, 40);

    doc.text(
      doc.splitTextToSize(
        "Address : Tarakeswar, Hooghly, West Bengal, 712401",
        maxWidth
      ),
      156,
      20
    );
    doc.text(doc.splitTextToSize("ROI : 3.00%", maxWidth), 156, 30);
    doc.text(doc.splitTextToSize("Inst. Amount : ", maxWidth), 156, 40);
    doc.text(doc.splitTextToSize("Maturity Amount : ", maxWidth), 156, 50);

    const headers = [
      "Serial No",
      "Date",
      "Particulars",
      "Withdrawals",
      "Deposit",
      "Interest",
      "Balance",
    ];

    const pdfTableData = convertTableData(tableData);

    console.log(pdfTableData);

    // Add table to PDF
    doc.autoTable({
      head: [headers],
      body: pdfTableData,
      startY: 70, // Position table
      margin: { horizontal: 5 },
      styles: {
        overflow: "linebreak",
        cellPadding: 5,
        fontSize: 10,
        lineColor: [215, 230, 244], // Border color
        lineWidth: 0.25, // Border width
      }, // Handle overflow
      columnStyles: {
        0: { cellWidth: 20 }, // Serial No.
        1: { cellWidth: 25 }, // Date
        2: { cellWidth: 55 }, // Particulars
        3: { cellWidth: 25 }, // Withdrawals
        4: { cellWidth: 25 }, // Deposit
        5: { cellWidth: 25 }, // Interest
        6: { cellWidth: 25 }, // Balance
      },
      didDrawPage: (data) => {
        // Header
        doc.setFontSize(18);
        doc.setTextColor(40);
        const pageWidth = doc.internal.pageSize.width;
        const headerHeight = 20; // Height of header area
        const headerText = `Savings Deposit Ledger From 01-Apr-2024 to 31-Sep-2025`;
        const textWidth = doc.getTextWidth(headerText);
        const xPos = (pageWidth - textWidth) / 2;

        doc.text(headerText, xPos, headerHeight / 2);

        // Footer
        const footerY = doc.internal.pageSize.height - 10;

        // Define footer texts
        const leftText = `Generated By : ${userName}`;
        const rightText = `Generated On : ${currentDate} ${currentTime}`;
        const middleText = `This is a computer-generated report and does not require a signature.`;

        // Calculate widths
        const leftTextWidth = getTextWidth(leftText, 10);
        const rightTextWidth = getTextWidth(rightText, 10);
        const middleTextWidth = getTextWidth(middleText, 10);

        // Position texts
        doc.setFontSize(12);

        // Left text
        doc.text(leftText, 5, footerY - 3);

        // Right text
        doc.text(rightText, pageWidth - rightTextWidth - 20, footerY - 3);

        doc.setFontSize(10);

        // Middle text (centered)
        const middleXPos = (pageWidth - middleTextWidth) / 2;
        doc.setTextColor(128, 128, 128); // Set text color to gray
        doc.text(middleText, middleXPos, footerY + 5); // Slightly above the other texts

        doc.setTextColor(0, 0, 0); // Set text color to gray

        // Draw page number
        doc.text(
          `Page ${data.pageNumber} of ${doc.internal.getNumberOfPages()}`,
          data.settings.margin.left,
          doc.internal.pageSize.height - 5
        );
      },
    });

    // Save the PDF
    doc.save("data.pdf");
  };

  const now = new Date();

  // Get individual components
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(now.getDate()).padStart(2, "0");
  let hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  // Determine AM or PM and adjust hours for 12-hour format
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert 0 to 12 for midnight
  hours = String(hours).padStart(2, "0");

  // Format the date and time
  const currentDate = `${year}-${month}-${day}`;
  const currentTime = `${hours}:${minutes}:${seconds} ${ampm}`;

  useEffect(() => {
    setUserName(getSessionStorageData("userName"));
  }, []);

  return (
    <div className="w-full border border-primary rounded-lg p-2 sm:p-5 lg:px-20">
      <Form {...form} className="">
        <form autoComplete="off" className="w-full">
          <Dialog open={dialougeOpen} onOpenChange={setDialougeOpen}>
            <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-x-10 gap-y-5  ">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <div className="">
                      <p className="inline-block text-lg">Date</p>
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left ",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd-MM-yyyy")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="center">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="accountNo"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <div className="">
                      <p className="inline-block text-lg">Account No.</p>
                    </div>

                    <FormControl>
                      <div className="">
                        <div className="">
                          <div className="relative w-full">
                            <Input
                              placeholder="Enter account no."
                              className="w-full "
                              type="number"
                              // onInput={(e) => {
                              //   if (e.target.value.length > 5) {
                              //     e.target.value = e.target.value.slice(0, 5);
                              //   }
                              // }}
                              {...field}
                            />
                            <div className="absolute right-0 top-0 py-3 px-3">
                              <DialogTrigger
                                asChild
                                className="cursor-pointer text-lg"
                              >
                                <IoSearch />
                              </DialogTrigger>
                            </div>
                          </div>
                          <FormMessage />
                        </div>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="w-full flex flex-col lg:flex-row justify-start self-end gap-5 bg-red-50">
                <Button
                  type=""
                  className="px-5"
                  onClick={form.handleSubmit(handleSubmit)}
                >
                  Next
                </Button>

                {showLedger && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 px-5 cursor-pointer py-2">
                        Show Legder
                      </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[825px] flex items-center justify-center flex-col ">
                      <DialogHeader className={`mt-5`}>
                        <DialogTitle className={`w-fit text-center`}>
                          Savings Deposit Ledger From{" "}
                          <span className="">01-Apr-2024</span> to{" "}
                          <span className="">31-Sep-2025</span>
                        </DialogTitle>
                      </DialogHeader>

                      <ScrollArea className=" rounded-md border w-[300px] sm:w-full overflow-y-hidden">
                        <div className="py-4 w-full flex flex-col gap-5  px-3 lg:px-0 overflow-y-hidden">
                          <div className="w-full border border-dashed border-primary bg-secondary flex items-stretch justify-between gap-5 p-5 text-sm">
                            <div className="space-y-2">
                              <p>
                                <span className="font-bold">
                                  Depositor Name :{" "}
                                </span>
                                <span>Surojit Polley</span>
                              </p>

                              <p>
                                <span className="font-bold">
                                  Gurdian Name :{" "}
                                </span>
                                <span>Pintu Polley</span>
                              </p>

                              <p>
                                <span className="font-bold">
                                  Reference A/C :{" "}
                                </span>
                                <span></span>
                              </p>

                              <p>
                                <span className="font-bold">
                                  Operation Mode :{" "}
                                </span>
                                <span>Single</span>
                              </p>
                            </div>

                            <div className="space-y-2">
                              <p>
                                <span className="font-bold">
                                  Product Name :{" "}
                                </span>
                                <span>Savings Deposit</span>
                              </p>

                              <p>
                                <span className="font-bold">L/F No. : </span>
                                <span>/</span>
                              </p>

                              <p>
                                <span className="font-bold">Date of Op : </span>
                                <span>20 Sep 2024</span>
                              </p>
                            </div>

                            <div className="space-y-2">
                              <p>
                                <span className="font-bold">A/C No. : </span>
                                <span>100121002681</span>
                              </p>

                              <p>
                                <span className="font-bold">Status : </span>
                                <span>Active</span>
                              </p>

                              <p>
                                <span className="font-bold">
                                  Maturity Date :{" "}
                                </span>
                                <span></span>
                              </p>
                            </div>

                            <div className="space-y-2">
                              <p>
                                <span className="font-bold">Address : </span>
                                <span>
                                  Tarakeswar, Hooghly, West Bengal, 712401
                                </span>
                              </p>

                              <p>
                                <span className="font-bold">ROI : </span>
                                <span>3.00%</span>
                              </p>

                              <p>
                                <span className="font-bold">
                                  Inst. Amount :{" "}
                                </span>
                                <span></span>
                              </p>

                              <p>
                                <span className="font-bold">
                                  Maturity Amount :{" "}
                                </span>
                                <span></span>
                              </p>
                            </div>
                          </div>
                          <div className="h-[500px]">
                            <ScrollArea className="h-[500px] overflow-y-scroll">
                              <Table className="border border-primary">
                                <TableCaption>
                                  <div className="w-full flex items-center justify-between">
                                    <p>Generated By : {userName}</p>
                                    <p>
                                      This is computer generated report and does
                                      not require signature.
                                    </p>
                                    <p>
                                      Generated On : {currentDate} {currentTime}
                                    </p>
                                  </div>
                                </TableCaption>
                                <TableHeader>
                                  <TableRow className="bg-primary text-white hover:bg-primary">
                                    <TableHead className=" text-white text-center w-10">
                                      Serial No
                                    </TableHead>
                                    <TableHead className=" text-white  border-l border-white">
                                      Date
                                    </TableHead>
                                    <TableHead className=" text-white border-l border-white w-fit text-center">
                                      Particulars
                                    </TableHead>
                                    <TableHead className=" text-white border-l border-white text-center">
                                      Withdrawals
                                    </TableHead>
                                    <TableHead className=" text-white border-l border-white text-center">
                                      Deposit
                                    </TableHead>
                                    <TableHead className=" text-white border-l border-white text-center">
                                      Interest
                                    </TableHead>
                                    <TableHead className="text-white border-l border-white text-center">
                                      Balance
                                    </TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {tableData.map((invoice, index) => (
                                    <TableRow key={invoice.invoice}>
                                      <TableCell className="font-medium border border-secondary text-center">
                                        {index + 1}
                                      </TableCell>
                                      <TableCell className="border border-secondary">
                                        {invoice.date}
                                      </TableCell>
                                      <TableCell className="border border-secondary">
                                        {invoice.particulars}
                                      </TableCell>
                                      <TableCell className="border border-secondary">
                                        {invoice.withdrawal}
                                      </TableCell>
                                      <TableCell className="border border-secondary">
                                        {invoice.deposit}
                                      </TableCell>
                                      <TableCell className="border border-secondary">
                                        {invoice.interest}
                                      </TableCell>
                                      <TableCell className="border border-secondary">
                                        {invoice.Balance}
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </ScrollArea>
                          </div>
                        </div>
                        <ScrollBar orientation="horizontal" />
                      </ScrollArea>

                      <DialogFooter className={`w-full`}>
                        <div className="w-full flex items-center justify-end gap-5">
                          <div className="p-2 rounded-full flex items-center justify-center text-center bg-primary text-white cursor-pointer text-3xl">
                            <IoPrint />
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <div className="p-2 rounded-full flex items-center justify-center text-center bg-primary text-white cursor-pointer text-3xl">
                                <IoShareSocial />
                              </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[200px]">
                              <DropdownMenuLabel className="text-lg">
                                Share via
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="cursor-pointer  py-2">
                                <p className="flex items-center gap-2 px-3">
                                  <IoMail className="text-xl text-primary" />{" "}
                                  Mail
                                </p>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer pl-5 py-2">
                                <p className="flex items-center gap-2 px-3">
                                  <FaWhatsapp className="text-xl text-primary" />{" "}
                                  Whatsapp
                                </p>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="cursor-pointer pl-5 py-2"
                                onClick={generatePDF}
                              >
                                <p className="flex items-center gap-2 px-3">
                                  <FaDownload className="text-xl text-primary" />{" "}
                                  Download
                                </p>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>

            <DialogContent className="">
              <DialogHeader
                className={`w-full flex items-center justify-center`}
              >
                <DialogTitle>Search Account</DialogTitle>
              </DialogHeader>
              <div className="w-full">
                <div className="w-full ">
                  <Tabs
                    defaultValue="account"
                    className="w-full flex items-center justify-center flex-col"
                  >
                    <TabsList className="w-[70%]">
                      <TabsTrigger value="memberNo" className="w-full">
                        By Member No.
                      </TabsTrigger>
                      <TabsTrigger value="name" className="w-full">
                        By Name
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent
                      value="memberNo"
                      className="w-full flex flex-col sm:flex-row items-end gap-2 gap-x-10 "
                    >
                      <FormField
                        control={form.control}
                        name="dialougeMemberNo"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Member No.</FormLabel>
                            <FormControl>
                              <Input
                                autoComplete="off"
                                placeholder="Search by enter member no."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        className="px-10"
                        onClick={handleSearchAccountListByMemberNo}
                      >
                        Search
                      </Button>
                    </TabsContent>
                    <TabsContent
                      value="name"
                      className="w-full flex flex-col sm:flex-row items-end gap-2 gap-x-10 "
                    >
                      <FormField
                        control={form.control}
                        name="dialougeAccountName"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                autoComplete="off"
                                placeholder="Search by enter name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        className="px-10"
                        onClick={handleSearchAccountListByName}
                      >
                        Search
                      </Button>
                    </TabsContent>
                  </Tabs>
                </div>
                <div className="w-full ">
                  <AccountSearchTable
                    data={accountListData}
                    handleSelectData={handleSelectClick}
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </form>
      </Form>
    </div>
  );
};
export default AccountSearchForm;
