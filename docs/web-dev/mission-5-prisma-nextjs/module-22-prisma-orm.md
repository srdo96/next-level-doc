# Prisma ORM Fundamentals

## Prisma Schema With Relations

> Write the schema for the database in a file called `prisma/schema.prisma`.

```prisma
datasource db {
  provider = "postgresql"
}

model Blog {
  blog_id     String     @id @default(uuid())
  title       String     @db.VarChar(225)
  content     String     @db.Text
  thumbnail   String?
  is_featured Boolean    @default(false)
  status      PostStatus @default(PUBLISHED)
  tags        String[]
  views       Int        @default(0)
  author_id   String // batter auth
  created_at  DateTime   @default(now())
  updated_at  DateTime   @updatedAt
  comments    Comment[]

  @@index([author_id])
  // by using @@map we can manually set the table name.
  //  Other wise model name will be set as table name
  @@map("blogs")
}

model Comment {
  comment_id        String        @id @default(uuid())
  content           String        @db.Text
  author_id         String // batter auth
  blog              Blog          @relation(fields: [blog_id], references: [blog_id])
  blog_id           String
  // One to Many Self Relation
  parent_comment    Comment?      @relation("CommentReplies", fields: [parent_comment_id], references: [comment_id])
  replies           Comment[]     @relation("CommentReplies")
  parent_comment_id String?
  status            CommentStatus @default(APPROVED)
  created_at        DateTime      @default(now())
  updated_at        DateTime      @updatedAt

  @@index([blog_id])
  @@index([author_id])
  @@map("comments")
}

// ENUM Declaration
enum PostStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}

enum CommentStatus {
  APPROVED
  REJECT
}
```

Then create a first migration to set up the database tables

```bash
npx prisma migrate dev --name init
```

Generate the Prisma Client.

```bash
npx prisma generate
```

Format the schema file.

```bash
npx prisma format
```
