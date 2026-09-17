import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../common/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useToast } from "../ui/use-toast";
import { addMemberFormElements } from "@/config";
import {
  addNewUser,
  deleteUser,
  fetchAllUsers,
  updateUserRole,
} from "@/store/admin/user-slice";

const initialFormData = {
  userName: "",
  email: "",
  password: "",
  role: "user",
};

function AdminMembersView() {
  const [openAddMemberDialog, setOpenAddMemberDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const { userList } = useSelector((state) => state.adminUsers);
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  function isFormValid() {
    return (
      formData.userName.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.password.trim() !== "" &&
      formData.role.trim() !== ""
    );
  }

  function onSubmit(event) {
    event.preventDefault();

    dispatch(addNewUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({ title: "Member added successfully" });
        dispatch(fetchAllUsers());
        setOpenAddMemberDialog(false);
        setFormData(initialFormData);
      } else {
        toast({
          title: data?.payload?.message || "Failed to add member",
          variant: "destructive",
        });
      }
    });
  }

  function handleRoleChange(memberId, role) {
    dispatch(updateUserRole({ id: memberId, role })).then((data) => {
      if (data?.payload?.success) {
        toast({ title: "Member role updated" });
        dispatch(fetchAllUsers());
      } else {
        toast({
          title: data?.payload?.message || "Failed to update role",
          variant: "destructive",
        });
      }
    });
  }

  function handleDelete(memberId) {
    dispatch(deleteUser(memberId)).then((data) => {
      if (data?.payload?.success) {
        toast({ title: "Member removed" });
        dispatch(fetchAllUsers());
      } else {
        toast({
          title: data?.payload?.message || "Failed to remove member",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <Fragment>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>All Members</CardTitle>
          <Button
            onClick={() => {
              setFormData(initialFormData);
              setOpenAddMemberDialog(true);
            }}
          >
            Add New Member
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userList && userList.length > 0
                ? userList.map((member) => {
                    const isSelf = member?._id === currentUser?.id;

                    return (
                      <TableRow key={member?._id}>
                        <TableCell>{member?.userName}</TableCell>
                        <TableCell>{member?.email}</TableCell>
                        <TableCell>
                          <Select
                            value={member?.role}
                            disabled={isSelf}
                            onValueChange={(role) =>
                              handleRoleChange(member?._id, role)
                            }
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="user">user</SelectItem>
                              <SelectItem value="admin">admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          {isSelf ? (
                            <Badge className="py-1 px-3 bg-black">You</Badge>
                          ) : (
                            <Button
                              variant="destructive"
                              onClick={() => handleDelete(member?._id)}
                            >
                              Delete
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
                : null}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Dialog
        open={openAddMemberDialog}
        onOpenChange={(open) => {
          setOpenAddMemberDialog(open);
          if (!open) setFormData(initialFormData);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Member</DialogTitle>
          </DialogHeader>
          <CommonForm
            onSubmit={onSubmit}
            formData={formData}
            setFormData={setFormData}
            buttonText="Add Member"
            formControls={addMemberFormElements}
            isBtnDisabled={!isFormValid()}
          />
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default AdminMembersView;
