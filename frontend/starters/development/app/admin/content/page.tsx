import Link from "next/link"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { MoreHorizontal, ArrowUpRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuDeleteItem,
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
import { unstable_noStore as noStore } from "next/cache"
import { formatDate } from "@powerstack/utils"
import { toast } from "sonner"

export const dynamic = "force-dynamic"

async function getNodes(type: string) {
  noStore()
  const params: JsonApiParams = {
    sort: "-changed",
  }
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
    throw new Error(`Failed to fetch resource:`, {
      cause: "DrupalError",
    })
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

export async function ContentList() {
  async function fetchNodes() {
    try {
      const fetchedNodes = await getNodes("node--page")
      return fetchedNodes
    } catch (e) {
      return e
    }
  }
  const nodes = await fetchNodes()

  const tableRows = nodes.map((node) => (
    <TableRow>
      <TableCell className="font-medium">
        <Link
          href={
            node?.path?.alias
              ? `${node?.path?.alias}`
              : `/node/${node.drupal_internal__nid}`
          }
        >
          {node.title}
        </Link>
      </TableCell>
      <TableCell>
        {node.status ? (
          <Badge variant="outline">Published</Badge>
        ) : (
          <Badge variant="outline">Unpublished</Badge>
        )}
      </TableCell>
      <TableCell>{formatDate(node.created)}</TableCell>
      <TableCell>{formatDate(node.changed)}</TableCell>
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
            <Link
              href={
                node?.path?.alias
                  ? node?.path?.alias
                  : `/node/${node.drupal_internal__nid}`
              }
            >
              <DropdownMenuItem>View</DropdownMenuItem>
            </Link>
            <Link
              href={
                node?.path?.alias
                  ? `${node?.path?.alias}/edit`
                  : `/node/${node.drupal_internal__nid}/edit`
              }
            >
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </Link>
            <DropdownMenuDeleteItem node={node}>Delete</DropdownMenuDeleteItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  ))
  return (
    <>
      <CardContent className="min-h-36">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{tableRows}</TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>{nodes.length}</strong> pages. If you need more robust
          content filtering visit{" "}
          <Link
            href={`${process.env.NEXT_PUBLIC_DRUPAL_HOST}/admin/content`}
            target="_blank"
            className="text-muted-foreground transition-colors hover:text-foreground underline"
          >
            here
            <ArrowUpRight className="w-3 h-3 inline" />
          </Link>
          .
        </div>
      </CardFooter>
    </>
  )
}

export default async function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full">
          <h1 className="text-3xl font-semibold">Content</h1>
        </div>
        <Card>
          <ContentList />
        </Card>
      </main>
    </div>
  )
}
