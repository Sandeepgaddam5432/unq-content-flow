import * as React from "react"
import { useNavigate } from "react-router-dom"
import { 
  LayoutDashboard, 
  Users, 
  PlusCircle, 
  Play, 
  Calendar, 
  BarChart3, 
  Key, 
  Settings,
  Youtube,
  Instagram,
  Search,
  Keyboard,
  PlusSquare,
  Plus
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

export function CommandMenu() {
  const [open, setOpen] = React.useState(false)
  const navigate = useNavigate();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => runCommand(() => navigate("/"))}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/channels"))}>
            <Users className="mr-2 h-4 w-4" />
            <span>Channel Management</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/content-creation"))}>
            <PlusCircle className="mr-2 h-4 w-4" />
            <span>Content Creation</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/generation"))}>
            <Play className="mr-2 h-4 w-4" />
            <span>Video Generation</span>
            <CommandShortcut className="ml-auto">
              <span className="bg-primary/20 text-primary rounded px-1.5 py-0.5 text-xs">NEW</span>
            </CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/publishing"))}>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Publishing Queue</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/analytics"))}>
            <BarChart3 className="mr-2 h-4 w-4" />
            <span>Analytics & Insights</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/api-management"))}>
            <Key className="mr-2 h-4 w-4" />
            <span>API Management</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/settings"))}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </CommandItem>
        </CommandGroup>
        
        <CommandSeparator />
        
        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => runCommand(() => navigate("/content-creation?action=new"))}>
            <Plus className="mr-2 h-4 w-4" />
            <span>Create New Video</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/channels?action=new"))}>
            <PlusSquare className="mr-2 h-4 w-4" />
            <span>Add Channel</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/api-management?action=new"))}>
            <Key className="mr-2 h-4 w-4" />
            <span>Add API Key</span>
          </CommandItem>
        </CommandGroup>
        
        <CommandSeparator />
        
        <CommandGroup heading="Help">
          <CommandItem onSelect={() => runCommand(() => window.open("https://docs.unqworkflow.com", "_blank"))}>
            <Keyboard className="mr-2 h-4 w-4" />
            <span>Keyboard Shortcuts</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => window.open("https://unqworkflow.com/support", "_blank"))}>
            <Search className="mr-2 h-4 w-4" />
            <span>Search Documentation</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
} 