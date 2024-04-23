import Link from "next/link"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { MoreHorizontal } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { drupal } from "@/lib/drupal"
import type { DrupalNode, JsonApiParams } from "next-drupal"

async function getNodes(type: string) {

  const params: JsonApiParams = {}
  if (type === "node--article") {
    params.include = "field_image,uid"
  }

  if (type === "node--page") {
    params.include = "field_page_builder,uid"
  }

  const resource = await drupal.getResourceCollection<DrupalNode[]>(type, {
    params,
  })

  if (!resource) {
    throw new Error(
      `Failed to fetch resource:`,
      {
        cause: "DrupalError",
      }
    )
  }

  return resource
}

type NodePageParams = {
    slug: string[]
  }
  type NodePageProps = {
    params: NodePageParams
    searchParams: { [key: string]: string | string[] | undefined }
  }

export async function generateMetadata() {
  
    return {
      title: `Admin: Content`,
    }
  }

export async function ContentList() {
    let nodes
    try {
      nodes = await getNodes('node--page')
    } catch (e) {
      // If we fail to fetch the node, don't return any metadata.
      return {}
    }
    const tableRows = nodes.map(node => (
        <TableRow>
              <TableCell className="font-medium">
                {node.title}
              </TableCell>
              <TableCell>
                {node.status ? <Badge variant="outline">Pubished</Badge> : <Badge variant="outline">Unpublished</Badge> }
              </TableCell>
              <TableCell className="hidden md:table-cell">{node.created}</TableCell>
              <TableCell className="hidden md:table-cell">
                {node.changed}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem><Link href={node?.path?.alias ? node?.path?.alias : `/node/${node.drupal_internal__nid}`}>View</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href={node?.path?.alias ? `${node?.path?.alias}/edit` : `/node/${node.drupal_internal__nid}/edit`}>Edit</Link></DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
    ))
  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Created</TableHead>
              <TableHead className="hidden md:table-cell">
                Updated
              </TableHead>
              <TableHead>
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableRows}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>{nodes.length}</strong> pages
        </div>
      </CardFooter>
    </Card>
  )
}


export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full">
          <h1 className="text-3xl font-semibold">Content</h1>
        </div>
        <ContentList />
      </main>
    </div>
  )
}
