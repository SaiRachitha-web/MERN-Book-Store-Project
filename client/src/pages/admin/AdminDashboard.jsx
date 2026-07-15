import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useListBooks, useBookStats } from "@/hooks/useBooks";
import { booksApi } from "@/api/client";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BookFormModal } from "./BookFormModal";
import {
  Plus,
  Pencil,
  Trash2,
  BookOpen,
  Settings,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboard() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(undefined);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
  }, [isAuthenticated, navigate]);

  const { data: books, isLoading, refetch: refetchBooks } = useListBooks();
  const { data: stats, refetch: refetchStats } = useBookStats();

  const handleEdit = (book) => {
    setEditingBook(book);
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setEditingBook(undefined);
    setIsFormOpen(true);
  };

  const handleFormSuccess = () => {
    refetchBooks();
    refetchStats();
  };

  const handleDelete = async () => {
    if (!bookToDelete) return;
    setIsDeleting(true);
    try {
      await booksApi.remove(bookToDelete);
      toast({
        title: "Book deleted",
        description: "The book has been removed from the catalog.",
      });
      refetchBooks();
      refetchStats();
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Failed to delete book",
        description: err?.response?.data?.error || "An unexpected error occurred.",
      });
    } finally {
      setIsDeleting(false);
      setBookToDelete(null);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="flex-1 bg-muted/10">
      <div className="bg-white border-b sticky top-16 z-30 shadow-sm">
        <div className="container mx-auto px-4 md:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-secondary">
            <Settings className="w-6 h-6" />
            <h1 className="font-serif text-2xl font-bold">Admin Dashboard</h1>
          </div>
          <Button onClick={handleAdd} className="w-full sm:w-auto shrink-0 shadow-sm">
            <Plus className="w-4 h-4 mr-2" />
            Add New Book
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* Admin Stats Overview */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Total Inventory</p>
                  <h3 className="text-3xl font-serif font-bold text-secondary">{stats.totalBooks}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <BookOpen className="w-6 h-6" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Active Categories</p>
                  <h3 className="text-3xl font-serif font-bold text-secondary">{stats.totalCategories}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Avg. Catalog Price</p>
                  <h3 className="text-3xl font-serif font-bold text-secondary">${stats.averagePrice.toFixed(2)}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-secondary">Manage Catalog</h2>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[300px]">Title & Author</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                      Loading books...
                    </TableCell>
                  </TableRow>
                ) : books && books.length > 0 ? (
                  books.map((book) => (
                    <TableRow key={book._id} className="group hover:bg-muted/20">
                      <TableCell>
                        <div className="font-medium text-secondary">{book.title}</div>
                        <div className="text-sm text-muted-foreground">{book.author}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-muted text-secondary">
                          {book.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">${book.price.toFixed(2)}</TableCell>
                      <TableCell>{book.rating.toFixed(1)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleEdit(book)}
                          >
                            <Pencil className="w-4 h-4 text-secondary" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => setBookToDelete(book._id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                      No books found in the catalog.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <BookFormModal
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        book={editingBook}
        onSuccess={handleFormSuccess}
      />

      <AlertDialog open={!!bookToDelete} onOpenChange={(open) => !open && setBookToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-3 text-destructive mb-2">
              <AlertCircle className="w-6 h-6" />
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            </div>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the book from the catalog database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Book"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
